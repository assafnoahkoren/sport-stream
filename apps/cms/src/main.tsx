import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css';
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/700.css";
import "@fontsource/heebo/900.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
