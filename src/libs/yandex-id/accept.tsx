import {useRef} from 'react';

const scriptUrl = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-latest.js';

export const YandexAccept: React.FC = () => {
  const scriptRef = useRef<HTMLScriptElement>(document.querySelector('#ya-accept-script'));

  if (!scriptRef.current) {
    scriptRef.current = document.createElement('script');
    scriptRef.current.id = 'ya-accept-script';
    scriptRef.current.src = scriptUrl;

    scriptRef.current.onload = () => {
      console.log('yaid, loaded');
      window.YaSendSuggestToken('http://localhost:5173');
    };

    document.body.appendChild(scriptRef.current);
  }

  return null;
};
