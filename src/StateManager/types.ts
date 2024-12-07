/**
 * StateManager
 * A lightweight state management solution that provides:
 * - Typed state management
 * - Action-based state updates
 * - State persistence
 * - Middleware support
 * - Subscription system
 */

/**
 * Configuration for creating a new state instance
 * @template T The type of the state object
 * 
 * @example
 * ```typescript
 * interface UserState {
 *   name: string;
 *   age: number;
 * }
 * 
 * const config: StateConfig<UserState> = {
 *   namespace: 'user',
 *   initialState: { name: '', age: 0 },
 *   persistence: {
 *     enabled: true,
 *     key: 'user_state'
 *   },
 *   middleware: [loggerMiddleware]
 * };
 * ```
 */
export interface StateConfig<T> {
    /** Initial state value that will be used when the state is created or reset */
    initialState: T;

    /** 
     * Unique namespace for the state instance
     * Used to isolate different state instances and for persistence
     */
    namespace: string;

    /** 
     * Configuration for state persistence
     * When enabled, state will be automatically saved to storage
     */
    persistence?: {
        /** Enable/disable state persistence */
        enabled: boolean;
        /** Custom storage key (defaults to `state_${namespace}`) */
        key?: string;
        /** Storage implementation (defaults to localStorage) */
        storage?: Storage;
    }

    /** 
     * Array of middleware functions to process actions
     * Middleware are executed in the order they are provided
     */
    middleware?: Middleware<T>[];
}

/**
 * API provided to middleware for accessing state and dispatching actions
 * @template T The type of the state object
 */
export type MiddlewareAPI<T> = {
    /** Get the current state */
    getState: () => T;
    /** Dispatch an action */
    dispatch: (action: Action<T, any>) => void;
}

/**
 * Middleware function type for intercepting and processing actions
 * @template T The type of the state object
 * 
 * @example
 * ```typescript
 * const loggerMiddleware: Middleware<UserState> = 
 *   (api) => (next) => (action) => {
 *     console.log('Before:', api.getState());
 *     next(action);
 *     console.log('After:', api.getState());
 *   };
 * ```
 */
export type Middleware<T> = (
    api: MiddlewareAPI<T>
) => (next: (action: Action<T, any>) => void) => (action: Action<T, any>) => void;

/**
 * Represents a state action with type, payload, and reducer
 * @template T State type
 * @template P Payload type
 * 
 * @example
 * ```typescript
 * const updateNameAction: Action<UserState, string> = {
 *   type: 'UPDATE_NAME',
 *   payload: 'John',
 *   reducer: (state, payload) => ({ name: payload })
 * };
 * ```
 */
export interface Action<T, P = void> {
    /** Unique action identifier in format `${namespace}/${actionType}` */
    type: string;
    /** Action payload data */
    payload?: P;
    /** Pure function that produces new state based on current state and payload */
    reducer: (state: T, payload: P) => Partial<T>
}

/**
 * Utility type for creating typed actions with payload
 * @template T State type
 * @template P Payload type
 * 
 * @example
 * ```typescript
 * const updateName = userState.createAction<string>(
 *   'UPDATE_NAME',
 *   (state, payload) => ({ name: payload })
 * );
 * updateName.create('John'); // Type-safe payload
 * ```
 */
export interface ActionCreator<T, P = void> {
    /** Action type identifier */
    type: string;
    /** Function to dispatch the action with a typed payload */
    create: (payload: P) => void;
    /** The reducer function associated with this action */
    reducer: (state: T, payload: P) => Partial<T>;
}

/**
 * Complete state management API
 * @template T State type
 * 
 * @example
 * ```typescript
 * const userState = createState<UserState>(config);
 * 
 * // Direct state updates
 * userState.setState({ name: 'John' });
 * 
 * // Subscribe to changes
 * const unsubscribe = userState.subscribe(state => {
 *   console.log('State updated:', state);
 * });
 * 
 * // Create and dispatch actions
 * const updateAge = userState.createAction<number>(
 *   'UPDATE_AGE',
 *   (state, age) => ({ age })
 * );
 * updateAge.create(25);
 * ```
 */
export interface StateActions<T> {
    /** Updates state partially, merging the provided changes */
    setState: (newState: Partial<T>) => void;

    /** Retrieves the current state */
    getState: () => T;

    /** 
     * Subscribes to state changes
     * @param callback Function called with new state when changes occur
     * @returns Function to unsubscribe
     */
    subscribe: (callback: (state: T) => void) => () => void;

    /** Resets state to initial value */
    reset: () => void;

    /** 
     * Dispatches an action through middleware and updates state
     * @param action Action object with type, payload, and reducer
     */
    dispatch: (action: Action<T, any>) => void;

    /** 
     * Creates a type-safe action creator
     * @param type Action type identifier
     * @param reducer Function to produce new state
     * @returns ActionCreator object
     */
    createAction: <P>(
        type: string,
        reducer: (state: T, payload: P) => Partial<T>
    ) => ActionCreator<T, P>;
}
