export function handleDelayedInput(event: Event, delay: number): Promise<unknown> {
    return new Promise((resolve) => {
        let timeoutId = null;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            console.log((event.target as HTMLInputElement).value)
            resolve((event.target as HTMLInputElement).value);
        }, delay);
    })
}
