// counter.ts

import { incrementCounter } from "../states/counterState";

export function setupCounter(element: HTMLButtonElement) {
    element.innerHTML = `Count`;

    element.addEventListener('click', () => {
        incrementCounter.create();
    });
}
