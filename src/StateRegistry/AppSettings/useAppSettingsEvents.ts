import React, { Dispatch, useEffect, useMemo } from "react";
import { useEventBus } from "../../services/EventBus";
import { AppSettings, AppSettingsEventService } from "./AppSettings";

type SubscriptionBuilder<T> = (handler: (update: T) => void) => () => void;


interface AppSettingsEventsInterface {
    useAppSettingsSubscribe: (setState: Dispatch<React.SetStateAction<AppSettings>>) => void;
    updateAppSettings: (update: Partial<AppSettings>) => void;
}

export const useAppSettingsEvents = (): AppSettingsEventsInterface => {
    const eventBus = useEventBus<AppSettingsEventService>();

    const onAppSettingsUpdate: SubscriptionBuilder<Partial<AppSettings>> = React.useCallback(
        handler => eventBus.subscribe('appSettings:update', handler), [eventBus]);

    return useMemo(() => {

        const useAppSettingsSubscribe = (setState: Dispatch<React.SetStateAction<AppSettings>>): void => {
            useEffect(() => {
                const unsubscribe = onAppSettingsUpdate((update) => {
                    setState((prevState) => ({
                        ...prevState,
                        ...update
                    }));
                });
                return () => {
                    unsubscribe();
                }
            }, [setState])
        }

        return {
            updateAppSettings: (update) => eventBus.publish('appSettings:update', update),
            useAppSettingsSubscribe,
        }

    }, [eventBus, onAppSettingsUpdate])
}
