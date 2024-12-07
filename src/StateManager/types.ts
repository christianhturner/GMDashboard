// src/StateManager/types.ts
export type StateConfig<T> = {
    initialState: T;
    namespace: string;
}

type StateActions<T> = {
    setState: (newState: Partial<T>) => void;
    getState: () => T;
    subscribe: (callback: (state: T) => void) => () => void;
}

export type StateDefinition<T> = {
    config: StateConfig<T>;
    actions: StateActions<T>;
}

