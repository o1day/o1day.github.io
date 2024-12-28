type PayloadCallback = <T>(payload: T) => void;
type TCloudAuthProps = {onAccess: PayloadCallback};
type TCloudStatus = boolean | string | undefined;

type TCloudProvider = 'yandex' | 'empty';

interface ICloudProvider {
  info(path: string = ''): Promise<unknown>;
  load<T>(path: string): Promise<T>;
  save<T>(path: string, body: T): Promise<unknown>;
  drop(path: string): Promise<unknown>;
}
