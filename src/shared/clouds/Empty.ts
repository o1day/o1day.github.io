export class Empty implements ICloudProvider {
  public info = () => Promise.resolve([]);
  public load = <T>(): Promise<T> => Promise.resolve(undefined as T);
  public save = (): Promise<unknown> => Promise.resolve();
  public drop = (): Promise<unknown> => Promise.resolve();
}
