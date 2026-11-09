import { createRoot, hydrateRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('app');
const app = <StrictMode><App /></StrictMode>;
// Hydrate production's pre-rendered content; Vite development starts empty.
if (container.querySelector('*')) hydrateRoot(container, app);
else createRoot(container).render(app);
