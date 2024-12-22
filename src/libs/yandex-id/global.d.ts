type TYandexAccess = {
  access_token: string;
  cid: string;
  expires_in: number;
  token_type: string;
};

interface Window {
  YaSendSuggestToken(origin: string, extraData?: Record<string, unknown>): void;

  YaAuthSuggest: {
    init(
      oauthQueryParams: {
        client_id: string;
        response_type: string;
        redirect_uri: string;
      },
      tokenPageOrigin: string,
      suggestParams?: {
        view: string;
        parentId: string;
        buttonView: string;
        buttonIcon: string;
        buttonTheme: string;
        buttonSize: string;
        buttonBorderRadius: number;
      },
    ): Promise<{
      status: 'ok' | 'error';
      handler(): Promise<TYandexAccess>;
      code?: string;
    }>;
  };
}
