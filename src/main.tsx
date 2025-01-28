import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import { Scribe } from './Themes/Scribe.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={Scribe}>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
