import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import {App} from './app/App.tsx';

const container = document.querySelector('#app');
const reactRoot = createRoot(container ?? document.body);

if (container) {
  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
