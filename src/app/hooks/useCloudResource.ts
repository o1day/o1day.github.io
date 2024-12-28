import {useState} from 'react';
import {useCloudContext} from './useCloudContext.ts';

type TResult<T> = [T | undefined, (payload: T) => Promise<void>, TCloudStatus];

export const useCloudResource = <T extends object>(
  path: string,
  onerror?: PayloadCallback,
): TResult<T> => {
  const {provider} = useCloudContext();
  const [status, setStatus] = useState<boolean | string>();
  const [payload, setPayload] = useState<T>();

  const load = () => {
    provider
      .load<T>(path)
      .then((result) => {
        setPayload(result);
        setStatus(true);
      })
      .catch((reason: unknown) => {
        onerror?.(reason);
        setStatus('error');
      });

    setStatus(false);
  };

  const save = async (body: T) => {
    await provider
      .save(path, body)
      .then(() => {
        setPayload(body);
      })
      .catch(() => {
        // nothing
      });
  };

  if (status === undefined) {
    load();
  }

  return [payload, save, status];
};
