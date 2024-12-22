import React, {useRef} from 'react';
import {TAuth} from '@app/context/AppContext';

const scriptId = 'yandex-id';
const scriptUri = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js';

export const YandexId: React.FC<{setAuth: (data: TAuth) => void}> = ({setAuth}) => {
  const nodeRef = useRef<HTMLScriptElement>(document.querySelector(`#${scriptId}`));

  if (!nodeRef.current) {
    nodeRef.current = document.createElement('script');
    nodeRef.current.type = 'text/javascript';
    nodeRef.current.src = scriptUri;
    nodeRef.current.id = scriptId;

    nodeRef.current.onerror = (...args) => {
      console.error('yandex-id', 'script-error', ...args);
    };

    nodeRef.current.onload = () => {
      console.log('yandex-id', 'load');

      window.YaAuthSuggest.init(
        {
          client_id: '2fbfe1320ffe44e8b5448dd1774f897c',
          response_type: 'token',
          redirect_uri: 'http://localhost:5173/auth/yandex',
        },
        'http://localhost:5173',
        {
          view: 'button',
          parentId: 'ya-btn',
          buttonSize: 's',
          buttonIcon: 'ya',
          buttonView: 'icon',
          buttonTheme: 'light',
          buttonBorderRadius: 16,
        },
      )
        .then(function (result) {
          console.log('yandex-id', 'ready', result);
          return result.handler();
        })
        .then((response) => {
          console.log('yandex-id', 'auth', response);
          setAuth({
            access_token: response.access_token,
            provider_name: 'yandex',
            authorized_at: Date.now(),
          });
        })
        .catch((error: unknown) => {
          console.error('yandex-id', 'yandex-error', error);
        });
    };

    document.body.appendChild(nodeRef.current);
  }

  return <div id='ya-btn' className={'w-10 h-10'} />;
};
