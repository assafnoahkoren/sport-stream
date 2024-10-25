import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css';
import "@fontsource/heebo/latin-400.css";
import "@fontsource/heebo/latin-700.css";
import "@fontsource/heebo/latin-900.css";
import '@mantine/dates/styles.css';
import { initArrowNavigation } from "@arrow-navigation/core"
initArrowNavigation({ debug: true })


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
