// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { AppSettings } from './StateRegistry/AppSettings/AppSettings';
// import { useAppSettingsEvents } from './StateRegistry/AppSettings/useAppSettingsEvents';
import { GMScreen } from './apps/GMScreen/GMScreen';

function App() {
    return (
        <GMScreen />
    )
    // const [appSettings, setAppSettings] = useState<AppSettings>({
    //     count: 0,
    //     theme: 'light'
    // });
    //
    // const { useAppSettingsSubscribe, updateAppSettings } = useAppSettingsEvents();
    //
    // useAppSettingsSubscribe(setAppSettings)
    //
    // const handleButtonIncrementClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    //     console.log(event);
    //     if (!appSettings.count) {
    //         updateAppSettings({ count: 1 })
    //         return
    //     }
    //     const newValue = appSettings.count + 1;
    //     updateAppSettings({ count: newValue })
    //
    // }
    // const handleButtonDecrementClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    //     console.log(event);
    //     if (!appSettings.count) {
    //         console.warn("Button doesn't decrement below 0")
    //         return
    //     }
    //     const newValue = appSettings.count - 1;
    //     updateAppSettings({ count: newValue })
    // }
    //
    // return (
    //     <>
    //         <div>
    //             <a href="https://vite.dev" target="_blank">
    //                 <img src={viteLogo} className="logo" alt="Vite logo" />
    //             </a>
    //             <a href="https://react.dev" target="_blank">
    //                 <img src={reactLogo} className="logo react" alt="React logo" />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //         <div className="card">
    //             <button onClick={(event) => handleButtonIncrementClick(event)}>
    //                 Increase Count
    //             </button>
    //             <button onClick={(event) => handleButtonDecrementClick(event)}>
    //                 Decrease Count
    //             </button>
    //             <p>
    //                 Your count value is {appSettings.count}
    //             </p>
    //         </div >
    //         <p className="read-the-docs">
    //             Click on the Vite and React logos to learn more
    //         </p>
    //     </>
    // )
}

export default App
