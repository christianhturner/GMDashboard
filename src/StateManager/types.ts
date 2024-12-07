

export type StateConfig<T> = {
    initialState: T;
    namespace: string;
    persistence?: {
        enabled: boolean;
        key?: string;
        storage?: Storage;
    }
}

export type Action<T, P = void> = {
    type: string;
    payload?: P;
    reducer: (state: T, payload: P) => Partial<T>
}

export type ActionCreator<T, P = void> = {
    type: string;
    create: (payload: P) => void;
}

export type StateActions<T> = {
    setState: (newState: Partial<T>) => void;
    getState: () => T;
    subscribe: (callback: (state: T) => void) => () => void;
    reset: () => void;
    dispatch: (action: Action<T, any>) => void;
    createAction: <P>(
        type: string,
        reducer: (state: T, payload: P) => Partial<T>
    ) => ActionCreator<T, P>;
}

