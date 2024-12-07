// resetButton.ts

import { counterState } from "../states/counterState";

export function setupResetButton(element: HTMLButtonElement) {
    element.innerHTML = 'Reset Counter';

    element.addEventListener('click', () => {
        counterState.actions.setState({
            count: 0,
            lastUpdated: new Date()
        });
    });
}