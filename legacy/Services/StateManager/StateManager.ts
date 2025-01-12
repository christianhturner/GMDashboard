import { useEventBus } from '../EventBus';
import { StateConfig, StateActions, Action, ActionCreator, MiddlewareAPI } from './types';

const globalStates = new Map<string, unknown>();
const globalActions = new Map<string, Map<string, Action<any, any>>>();

/**
 * Creates a new state instance with associated actions, subscribers, and middleware support
 * 
 * @template T The type of the state object. Must be an object type.
 * @param config Configuration object for the state instance
 * @returns A StateActions object containing methods to manage the state
 * 
 * @throws {Error} If namespace is missing or contains ":"
 * 
 * @example
 * Basic Usage:
 * ```typescript
 * interface UserState {
 *   name: string;
 *   age: number;
 * }
 * 
 * const userState = createState<UserState>({
 *   namespace: 'user',
 *   initialState: { name: '', age: 0 },
 *   persistence: { enabled: true }
 * });
 * ```
 * 
 * @example
 * Using Actions:
 * ```typescript
 * const updateName = userState.createAction<string>(
 *   'UPDATE_NAME',
 *   (state, payload) => ({ name: payload })
 * );
 * 
 * updateName.create('John'); // Updates name to "John"
 * ```
 * 
 * @example
 * Using Middleware:
 * ```typescript
 * const loggerMiddleware: Middleware<UserState> = (api) => (next) => (action) => {
 *   console.log('Before:', api.getState());
 *   next(action);
 *   console.log('After:', api.getState());
 * };
 * 
 * const userState = createState<UserState>({
 *   namespace: 'user',
 *   initialState: { name: '', age: 0 },
 *   middleware: [loggerMiddleware]
 * });
 * ```
 * 
 * @example
 * Using Subscriptions:
 * ```typescript
 * const unsubscribe = userState.subscribe(state => {
 *   console.log('State updated:', state);
 * });
 * 
 * // Later: cleanup subscription
 * unsubscribe();
 * ```
 * 
 * @example
 * Persistence Configuration:
 * ```typescript
 * const userState = createState<UserState>({
 *   namespace: 'user',
 *   initialState: { name: '', age: 0 },
 *   persistence: {
 *     enabled: true,
 *     key: 'custom_storage_key', // optional
 *     storage: sessionStorage    // optional, defaults to localStorage
 *   }
 * });
 * ```
 * 
 * The returned StateActions object provides the following methods:
 * - setState: Directly updates the state
 * - getState: Retrieves the current state
 * - subscribe: Subscribes to state changes
 * - reset: Resets state to initial values
 * - dispatch: Dispatches an action
 * - createAction: Creates a new action creator
 * 
 * @see {@link StateConfig} for configuration options
 * @see {@link StateActions} for available methods
 * @see {@link Action} for action structure
 * @see {@link Middleware} for middleware implementation
 */

export function createState<T extends object>(
    config: StateConfig<T>
): StateActions<T> {
    if (!config.namespace) {
        throw new Error('Namespace is required');
    }
    if (config.namespace.includes(':')) {
        throw new Error('Namespace cannot include ":"');
    }

    const {
        initialState,
        namespace,
        persistence = { enabled: false },
        middleware = []
    } = config;

    const storageKey = persistence.key || `state_${namespace}`;
    const storage = persistence.storage || localStorage;

    const eventBus = useEventBus<{
        [K in `${typeof namespace}:stateChange`]: T;
    }>();

    // Load persisted state if enabled
    const loadPersistedState = (): T => {
        if (persistence.enabled) {
            const persistedState = storage.getItem(storageKey);
            if (persistedState) {
                try {
                    return JSON.parse(persistedState);
                } catch (e) {
                    console.error(`Failed to parse persisted state for ${namespace}`, e);
                }
            }
        }
        return initialState;
    };

    // Initialize state
    if (!globalStates.has(namespace)) {
        globalStates.set(namespace, loadPersistedState());
        globalActions.set(namespace, new Map());
    }

    const setState = (newState: Partial<T>): void => {
        const currentState = globalStates.get(namespace) as T;
        const updatedState = {
            ...currentState,
            ...newState
        };
        globalStates.set(namespace, updatedState);

        if (persistence.enabled) {
            try {
                storage.setItem(storageKey, JSON.stringify(updatedState));
            } catch (e) {
                console.error(`Failed to persist state for ${namespace}`, e);
            }
        }

        eventBus.publish(`${namespace}:stateChange` as `${typeof namespace}:stateChange`, updatedState);
    };

    const getState = (): T => {
        return globalStates.get(namespace) as T;
    };

    const subscribe = (callback: (state: T) => void): (() => void) => {
        return eventBus.subscribe(`${namespace}:stateChange` as `${typeof namespace}:stateChange`, callback);
    };

    const reset = (): void => {
        setState(initialState);
    };

    // Create middleware API
    const middlewareAPI: MiddlewareAPI<T> = {
        getState,
        dispatch: (action: Action<T, any>) => composedDispatch(action)
    };

    // Base dispatch function
    const baseDispatch = <P>(action: Action<T, P>): void => {
        const currentState = getState();
        const newState = action.reducer(currentState, action.payload as P);
        setState(newState);
    };

    // Compose middleware
    const composedDispatch = middleware.reduce(
        (next, middleware) => middleware(middlewareAPI)(next),
        baseDispatch
    );

    const createAction = <P>(
        type: string,
        reducer: (state: T, payload: P) => Partial<T>
    ): ActionCreator<T, P> => {
        const actionType = `${namespace}/${type}`;
        const action: Action<T, P> = {
            type: actionType,
            reducer
        };

        const actionMap = globalActions.get(namespace)!;
        actionMap.set(actionType, action);

        return {
            type: actionType,
            create: (payload: P) => {
                composedDispatch({ ...action, payload });
            },
            reducer
        };
    };

    return {
        setState,
        getState,
        subscribe,
        reset,
        dispatch: composedDispatch,
        createAction
    };
}
