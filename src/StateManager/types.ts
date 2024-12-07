
/**
 * StateManager
 * A lightweight state management solution with support for actions, persistence, and subscriptions.
 */

/**
 * Configuration for creating a new state instance
 * @template T The type of the state object
 */
export interface StateConfig<T> {
    /** Initial state value */
    initialState: T;
    /** Unique namespace for the state instance */
    namespace: string;
    /** Persistence configuration */
    persistence?: {
        /** Enable/disable state persistence */
        enabled: boolean;
        /** Custom storage key (defaults to `state_${namespace}`) */
        key?: string;
        /** Storage implementation (defaults to localStorage) */
        storage?: Storage;
    }
}

/**
 * Represents a state action
 * @template T State type
 * @template P Payload type
 */
export interface Action<T, P = void> {
    /** Unique action identifier */
    type: string;
    /** Action payload */
    payload?: P;
    /** Reducer function that produces new state */
    reducer: (state: T, payload: P) => Partial<T>
}

/**
 * Action creator utility type
 * @template T State type
 * @template P Payload type
 */
export interface ActionCreator<T, P = void> {
    /** Action type identifier */
    type: string;
    /** Function to dispatch the action with payload */
    create: (payload: P) => void;
}

/**
 * State management API interface
 * @template T State type
 */
export interface StateActions<T> {
    /** Updates state partially */
    setState: (newState: Partial<T>) => void;
    /** Retrieves current state */
    getState: () => T;
    /** Subscribes to state changes
     * @returns Unsubscribe function
     */
    subscribe: (callback: (state: T) => void) => () => void;
    /** Resets state to initial value */
    reset: () => void;
    /** Dispatches an action */
    dispatch: (action: Action<T, any>) => void;
    /** Creates a new action creator */
    createAction: <P>(
        type: string,
        reducer: (state: T, payload: P) => Partial<T>
    ) => ActionCreator<T, P>;
}

