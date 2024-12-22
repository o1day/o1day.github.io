import {useMemo} from 'react';

export const useStorage = <T>(key: string, json: boolean): [T | null, (value: unknown) => void] => {
  const value = localStorage.getItem(key);

  const memoizedValue = useMemo(
    () => (json && value ? JSON.parse(value) : value) as T,
    [json, value],
  );

  const setValue = (value: unknown) => {
    localStorage.setItem(key, json ? JSON.stringify(value) : String(value));
  };

  return [memoizedValue, setValue];
};
