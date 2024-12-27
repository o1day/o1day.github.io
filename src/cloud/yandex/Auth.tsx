import React, {useRef} from 'react';

import {scriptId, scriptUri, authQueryParams, buttonId, suggestButton, logger} from './const';

export const YandexAuth: React.FC<TCloudAuthProps> = ({onAccess}) => {
  const nodeRef = useRef<HTMLScriptElement>(document.querySelector(`#${scriptId}`));

  if (!nodeRef.current) {
    nodeRef.current = document.createElement('script');
    nodeRef.current.type = 'text/javascript';
    nodeRef.current.src = scriptUri;
    nodeRef.current.id = scriptId;

    nodeRef.current.onerror = (...args) => {
      logger.error('script failed', ...args);
    };

    nodeRef.current.onload = () => {
      logger.log('script loaded');

      window.YaAuthSuggest.init(authQueryParams, origin, suggestButton)
        .then((result) => {
          logger.log('oauth ready', result);
          return result.handler();
        })
        .then((response) => {
          logger.log('oauth success', response);
          onAccess(response);
        })
        .catch((reason: unknown) => {
          logger.error('auth failed', reason);
        });
    };

    document.body.appendChild(nodeRef.current);
  }

  return <div id={buttonId} className={'w-10 h-10'} />;
};
