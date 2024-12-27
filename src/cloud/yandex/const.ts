import {consoleLogger} from '@core/utils/consoleLogger.ts';

export const scriptId = 'yandex-oath-script';
export const buttonId = 'yandex-suggest-button';
export const scriptUri = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-latest.js';

export const clientId = '2fbfe1320ffe44e8b5448dd1774f897c';
export const redirectUri = `${origin}/auth_yandex.html`;

export const logger = consoleLogger('yandex');

export const authQueryParams: TYandexAuthQuery = {
  client_id: clientId,
  response_type: 'token',
  redirect_uri: redirectUri,
};

export const suggestButton: TYandexSuggest = {
  view: 'button',
  parentId: buttonId,
  buttonSize: 's',
  buttonIcon: 'ya',
  buttonView: 'icon',
  buttonTheme: 'light',
  buttonBorderRadius: 16,
};

export const diskBaseUri = 'https://cloud-api.yandex.net/v1/disk';
