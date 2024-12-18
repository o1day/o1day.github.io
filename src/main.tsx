import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const node = document.querySelector('#root');
if (node) {
  createRoot(node).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
