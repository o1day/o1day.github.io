import {diskBaseUri, logger} from './const';

type TRequestParams = Record<string, string> & {path: string};

export class Disk implements ICloudProvider {
  private readonly headers: HeadersInit;
  private readonly root = 'app:';

  private static _instance: Disk | undefined;
  public static instance(credentials: TYandexAccess) {
    if (this._instance === undefined) {
      this._instance = new Disk(credentials);
    }

    return this._instance;
  }

  private constructor(credentials: TYandexAccess) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `OAuth ${credentials.access_token}`,
    };

    logger.log('constructor', credentials);
  }

  private async request<T>(method: string, query: string, params?: TRequestParams) {
    logger.log('disk_request', method, query, params);

    let uri = `${diskBaseUri}/${query}`;
    if (params && 'path' in params) {
      params.path = `${this.root}/${params.path}`;
      uri += `?${new URLSearchParams(params)}`;
    }

    return fetch(uri, {method, headers: this.headers})
      .then(this.handleResponse<T>('disk_response'))
      .catch(this.handleError('disk_failure'));
  }

  private fetchByDiskLink<T>({method, href}: TDiskLink, log: string, body?: BodyInit) {
    logger.log('disk_link', log, method, href);

    return fetch(String(href), {method, body})
      .then(this.handleResponse<T>(`disk_link_${log}`))
      .catch(this.handleError(`disk_link_${log}`));
  }

  private handleResponse =
    <T>(log: string) =>
    async (response: Response) => {
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw response;
      }

      return await response
        .json()
        .then((result) => {
          logger.log(log, 'payload', result);
          return result as T;
        })
        .catch(() => {
          logger.log(log, response);
          return undefined as T;
        });
    };

  private handleError = (log: string) => (reason: unknown) => {
    logger.error(log, reason);
    throw reason;
  };

  public info = (path = '') => this.request<TDiskResource>('get', 'resources', {path});

  public drop = (path: string, options: object = {permanently: true}) =>
    this.request('delete', 'resources', {path, ...options});

  public load = <T>(path: string) =>
    this.request<TDiskLink>('get', 'resources/download', {path}).then((link) =>
      this.fetchByDiskLink<T>(link, 'read'),
    );

  public save = <T>(path: string, body: T, options: object = {overwrite: 'true'}) =>
    this.request<TDiskLink>('get', 'resources/upload', {path, ...options}).then((link) =>
      this.fetchByDiskLink(link, 'write', JSON.stringify(body)),
    );

  public status = (operationId: string) => this.request('get', `operations/${operationId}`);
}
