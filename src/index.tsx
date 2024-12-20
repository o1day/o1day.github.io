import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import {App} from './app/App.tsx';

const container = document.querySelector('#root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
