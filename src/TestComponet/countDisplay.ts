// counterDisplay.ts

import { counterState } from "../states/counterState";

export function setupCounterDisplay(element: HTMLElement) {
    const unsubscribe = counterState.actions.subscribe((state) => {
        element.textContent = `Current count: ${state.count}`;
    });

    // Initial render
    const initialState = counterState.actions.getState();
    element.textContent = `Current count: ${initialState.count}`;

    return () => {
        unsubscribe();
    };
}
