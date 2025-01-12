import React, { Dispatch, useEffect } from "react";
import { useEventBus } from "../../services/EventBus";
import { AppSettings, AppSettingsEventService } from "./AppSettings";

type AppSettingsUpdate = (handler: (update: Partial<AppSettings>) => void) => () => void;


interface AppSettingsEventsInterface {
    useAppSettingsSubscribe: (setState: Dispatch<React.SetStateAction<AppSettings>>) => void;
    updateAppSettings: (update: Partial<AppSettings>) => void;
}

export const useAppSettingsEvents = (): AppSettingsEventsInterface => {
    const eventBus = useEventBus<AppSettingsEventService>();

    const onAppSettingsUpdate: AppSettingsUpdate = (handler) => eventBus.subscribe('appSettings:update', handler);

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
}
