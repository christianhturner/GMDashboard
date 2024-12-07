// resetButton.ts
import { resetCounter } from "../states/counterState";

export function setupResetButton(element: HTMLButtonElement) {
    element.innerHTML = 'Reset Counter';

    element.addEventListener('click', () => {
        resetCounter.create();
    });
}
