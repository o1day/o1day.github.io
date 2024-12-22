import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import {App} from './app/App';
import {Auth} from './auth/Auth.tsx';

const container = document.querySelector('#app');
const reactRoot = createRoot(container ?? document.body);
const isAuth = window.location.pathname.startsWith('/auth/');

if (container) {
  if (isAuth) {
    reactRoot.render(
      <StrictMode>
        <Auth />
      </StrictMode>,
    );
  } else {
    reactRoot.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}
