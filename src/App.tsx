import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppSettings } from './StateRegistry/AppSettings/AppSettings';
import { useAppSettingsEvents } from './StateRegistry/AppSettings/useAppSettingsEvents';

function App() {
    const [appSettings, setAppSettings] = useState<AppSettings>({
        count: 0,
        theme: 'light'
    });

    const { useAppSettingsSubscribe, updateAppSettings } = useAppSettingsEvents();

    useAppSettingsSubscribe(setAppSettings)

    const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
        console.log(event);
        if (!appSettings.count) {
            updateAppSettings({ count: 1 })
            return
        }
        const newValue = appSettings.count + 1;
        updateAppSettings({ count: newValue })

    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={(event) => handleButtonClick(event)}>
                    count is {appSettings.count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div >
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
