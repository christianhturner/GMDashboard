/**
 * Creates a new state instance with associated actions and subscribers
 * @template T The type of the state object
 * @param config Configuration object for the state instance
 * @returns State management API
 * 
 * @example
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
 * 
 * // Create an action
 * const updateName = userState.createAction<string>(
 *   'UPDATE_NAME',
 *   (state, payload) => ({ name: payload })
 * );
 * 
 * // Subscribe to changes
 * const unsubscribe = userState.subscribe(state => {
 *   console.log('State updated:', state);
 * });
 * 
 * // Dispatch action
 * updateName.create('John');
 * ```
 */
import { useEventBus } from '../EventBus';
import { StateConfig, StateActions, Action, ActionCreator } from './types';

const globalStates = new Map<string, unknown>();
const globalActions = new Map<string, Map<string, Action<any, any>>>();

export function createState<T extends object>(
    config: StateConfig<T>
): StateActions<T> {
    if (!config.namespace) {
        throw new Error('Namespace is required');
    }
    if (config.namespace.includes(':')) {
        throw new Error('Namespace cannot include ":"')
    }
    const {
        initialState,
        namespace,
        persistence = { enabled: false }
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

        // Persist state if enabled
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

    const dispatch = <P>(action: Action<T, P>): void => {
        const currentState = getState();
        const newState = action.reducer(currentState, action.payload as P);
        setState(newState);
    };

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
                dispatch({ ...action, payload });
            }
        };
    };

    return {
        setState,
        getState,
        subscribe,
        reset,
        dispatch,
        createAction
    };
}
