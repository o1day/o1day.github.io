type TResource = {
  resource_id: string;
  name: string;
  path: string;
  created: string;
  modified: string;
  revision: number;
  comment_ids: {
    private_resource: string;
    public_resource: string;
  };
};

type TFileResource = TResource & {
  type: 'file';
  antivirus_status: 'clean';
  md5: string;
  media_type: 'text';
  mime_type: 'text/plain';
  file: string;
  preview: string;
  sha256: string;
  size: number;
};

type TDirResource = TResource & {
  type: 'dir';
  _embedded: {
    sort: '';
    items: TDiskResource[];
    limit: number;
    offset: number;
    path: string;
    total: number;
  };
};

type TDiskResource = TFileResource | TDirResource;

type TDiskLink = {
  method: string;
  href: string;
};

type TDiskError = {
  error: string;
  message: string;
  description: string;
};

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
