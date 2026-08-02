import { hydrateRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

// Use hydrateRoot instead of createRoot so React attaches event listeners
// to the pre-rendered static HTML without re-rendering the DOM.
hydrateRoot(
  document.getElementById('app'),
  <StrictMode>
    <App />
  </StrictMode>
)
