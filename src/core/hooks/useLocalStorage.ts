import {useCallback, useState} from 'react';

export function useLocalStorage<T>(key: string, json: boolean): [T | undefined, PayloadCallback];
export function useLocalStorage<T>(key: string, json: boolean, fallback: T): [T, PayloadCallback];

export function useLocalStorage<T>(key: string, json: boolean, fallback?: T) {
  const loadValue = () => {
    const value = localStorage.getItem(key);
    return value && json ? (JSON.parse(value) as T) : ((value as T) ?? fallback);
  };

  const [stored, setStored] = useState(() => loadValue());
  const saveValue = useCallback(
    (value: T) => {
      localStorage.setItem(key, json ? JSON.stringify(value) : String(value));
      setStored(value);
    },
    [key, json],
  );

  return [stored, saveValue];
}
