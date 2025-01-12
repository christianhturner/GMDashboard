import { EventPayloadInterface, TypedEmitter } from './types';

// Global emitter variable
let globalEmitter: TypedEmitter | undefined;

export const useEventBus = <TEventService extends EventPayloadInterface = EventPayloadInterface>(): TypedEmitter<TEventService> => {
    if (!globalEmitter) {
        const listeners = new Map<keyof TEventService, ((payload: unknown) => void)[]>();

        const getListeners = (): Map<keyof TEventService, ((payload: unknown) => void)[]> => listeners;
        console.log(listeners);

        const subscribe = <TEvent extends keyof TEventService>(
            event: TEvent,
            handler: (payload: TEventService[TEvent]) => void
        ): (() => void) => {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
             
            const eventListeners = listeners.get(event)!;
            eventListeners.push(handler as (payload: unknown) => void);

            return () => {
                const currentListeners = listeners.get(event);
                if (currentListeners) {
                    listeners.set(
                        event,
                        currentListeners.filter((listener) => listener !== handler)
                    );
                }
            };
        };

        const publish = <TEvent extends keyof TEventService>(event: TEvent, payload: TEventService[TEvent]): void => {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach((listener) => listener(payload));
            }
        };

        globalEmitter = { subscribe, publish, getListeners } as TypedEmitter;
    }
    return globalEmitter as TypedEmitter<TEventService>;
};
