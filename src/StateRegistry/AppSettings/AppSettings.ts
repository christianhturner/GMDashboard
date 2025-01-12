export interface AppSettings {
    count?: number,
    theme?: 'light' | 'dark'
}

export type AppSettingsEventService = {
    "appSettings:update": AppSettings
}
