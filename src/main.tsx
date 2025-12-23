import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import SimpsonsWebApp from './SimpsonsWebApp.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpsonsWebApp />
  </StrictMode>,
);
