import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

<<<<<<< HEAD
import './styles/main.scss';
import './index.css';
=======
import './styles/global.scss';
>>>>>>> develop

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
