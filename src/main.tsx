import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GMScreen } from './apps/GMScreen/GMScreen.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <GMScreen />
    </StrictMode>,
)
