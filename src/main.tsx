import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

(window as any).__BUILD_TIME__ = (import.meta.env as any).VITE_BUILD_TIME;
console.log("%c🚀 Versión construida el: " + (import.meta.env as any).VITE_BUILD_TIME, "color: #00ff00; font-weight: bold; background: #000; padding: 4px; border-radius: 4px;");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

