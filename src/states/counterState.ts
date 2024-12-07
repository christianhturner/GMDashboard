// src/states/counterState.ts
import { createState } from "../StateManager/StateManager";
import { Middleware } from "../StateManager/types";

const loggerMiddleware: Middleware<any> = (api) => (next) => (action) => {
    console.group(action.type);
    console.log('Previous State:', api.getState());
    console.log('Action:', action);

    const result = next(action);

    console.log('Next State:', api.getState());
    console.groupEnd();

    return result;
}


interface CounterState {
    count: number;
    lastUpdated: Date;
}

export const counterState = createState<CounterState>({
    namespace: 'counter',
    initialState: {
        count: 0,
        lastUpdated: new Date()
    },
    middleware: [loggerMiddleware]
});

// Create actions
export const incrementCounter = counterState.createAction<void>(
    'INCREMENT',
    (state) => ({
        count: state.count + 1,
        lastUpdated: new Date()
    })
);

export const decrementCounter = counterState.createAction<void>(
    'DECREMENT',
    (state) => ({
        count: state.count - 1,
        lastUpdated: new Date()
    })
);

export const resetCounter = counterState.createAction<void>(
    'RESET',
    () => ({
        count: 0,
        lastUpdated: new Date()
    })
);
