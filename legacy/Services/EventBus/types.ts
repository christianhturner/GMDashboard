/**
 * Base interface that all EventServices will implement
 */
export type EventPayloadInterface = Record<string, unknown>;

/**
 * Core Eventbus interface
 */
export interface TypedEmitter<TEventService extends EventPayloadInterface = EventPayloadInterface> {
    /**
     * Subscribe to an event
     * @param event - The event name to subscribe to
     * @param handler - The callback function to handle the event
     * @returns A cleanup function to unsubscribe
     */
    subscribe: <TEvent extends keyof TEventService>(event: TEvent, handler: (payload: TEventService[TEvent]) => void) => () => void;

    /**
     * Publish an event to subscribers
     * @param event - The event name to publish
     * @param payload - The event payload passed to the subscribed handler
     */
    publish: <TEvent extends keyof TEventService>(event: TEvent, payload: TEventService[TEvent]) => void;

    /**
     * Get all current event listeners
     * @returns A map of event names to their handlers
     */
    getListeners: () => Map<keyof TEventService, ((payload: unknown) => void)[]>;

} 
