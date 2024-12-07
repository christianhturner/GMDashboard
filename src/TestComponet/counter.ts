import { counterState } from "../states/counterState";

export function setupCounter(element: HTMLButtonElement) {
    // Subscribe to state changes
    const unsubscribe = counterState.subscribe((state) => {
        element.innerHTML = `count is ${state.count} (Last updated: ${state.lastUpdated.toLocaleTimeString()})`;
    });

    // Add click handler
    element.addEventListener('click', () => {
        const currentState = counterState.getState();
        counterState.setState({
            count: currentState.count + 1,
            lastUpdated: new Date()
        });
    });

    // Initial render
    const initialState = counterState.getState();
    element.innerHTML = `count is ${initialState.count}`;

    // Return cleanup function
    return () => {
        unsubscribe();
    };
}
