// src/StateManager/StateManager.ts
import { useEventBus } from '../EventBus';
import { StateConfig, StateDefinition } from './types';

const globalStates = new Map<string, unknown>();

export function createState<T extends object>(
    config: StateConfig<T>
): StateDefinition<T> {
    const { initialState, namespace } = config;
    const eventBus = useEventBus<{
        [K in `${typeof namespace}:stateChange`]: T;
    }>();

    // Initialize state if it doesn't exist
    if (!globalStates.has(namespace)) {
        globalStates.set(namespace, initialState);
    }

    const setState = (newState: Partial<T>): void => {
        const currentState = globalStates.get(namespace) as T;
        const updatedState = {
            ...currentState,
            ...newState
        };
        globalStates.set(namespace, updatedState);
        eventBus.publish(`${namespace}:stateChange` as `${typeof namespace}:stateChange`, updatedState);
    };

    const getState = (): T => {
        return globalStates.get(namespace) as T;
    };

    const subscribe = (callback: (state: T) => void): (() => void) => {
        return eventBus.subscribe(`${namespace}:stateChange` as `${typeof namespace}:stateChange`, callback);
    };

    return {
        config,
        actions: {
            setState,
            getState,
            subscribe
        }
    };
}
