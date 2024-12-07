// src/states/counterState.ts
import { createState } from "../StateManager/StateManager";

interface CounterState {
    count: number;
    lastUpdated: Date;
}

export const counterState = createState<CounterState>({
    namespace: 'counter',
    initialState: {
        count: 0,
        lastUpdated: new Date()
    }
});
