type TYandexAuthQuery = {
  client_id: string;
  response_type: string;
  redirect_uri: string;
};

type TYandexSuggest = {
  view: string;
  parentId: string;
  buttonView: string;
  buttonIcon: string;
  buttonTheme: string;
  buttonSize: string;
  buttonBorderRadius: number;
};

type TYandexAccess = {
  access_token: string;
  token_type: string;
  expires_in: number;
  cid: string;
};

interface Window {
  YaSendSuggestToken(origin: string, extraData?: Record<string, unknown>): void;

  YaAuthSuggest: {
    init(
      oauthQueryParams: TYandexAuthQuery,
      tokenPageOrigin: string,
      suggestParams?: TYandexSuggest,
    ): Promise<{
      status: 'ok' | 'error';
      handler(): Promise<TYandexAccess>;
      code?: string;
    }>;
  };
}
