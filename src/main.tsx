import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ColorsProvider from './providers/ColorsProvider.tsx'
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorsProvider>
      <App />
    </ColorsProvider>
  </StrictMode>,
)
