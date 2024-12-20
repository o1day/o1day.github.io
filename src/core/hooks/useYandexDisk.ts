import {useState} from 'react';

type TFile = {
  href: string;
  method: string;
  operation_id: string;
};

export function useYandexDisk(): [VoidFunction, boolean] {
  const [loading, setLoading] = useState(false);

  const request = async <T>(
    method: string,
    uri?: string,
    params?: Record<string, string>,
  ): Promise<T> => {
    const token = 'y0_AgAAAAB64c_kAAz8tAAAAAEc6xdfAAD6c1KVS9dIxbM5RJ8HQAMu84xIuw';
    const host = 'https://cloud-api.yandex.net/v1/disk';
    const headers = {
      Authorization: `OAuth ${token}`,
      'Content-Type': 'application/json',
    };

    const search = params ? String(new URLSearchParams(params)) : undefined;
    const query = [uri, search].filter(Boolean).join('?');

    return fetch(`${host}/${query}`, {method, headers}).then((res) => res.json() as T);
  };

  const test = async () => {
    setLoading(true);
    const resources = await request('get', 'resources', {path: 'app:/'});
    console.log('resources.request', resources);

    const upload = await request<TFile>('get', 'resources/upload', {
      path: 'app:/test.json',
      overwrite: 'true',
    });
    console.log('upload.request', upload);

    const result = await fetch(String(upload.href), {
      method: String(upload.method),
      body: JSON.stringify({test: 'success'}),
    });
    console.log(result);

    const download = await request<TFile>('get', 'resources/download', {
      path: 'app:/test.json',
    });
    console.log('download.request', download);

    const res = await fetch(String(download.href), {
      method: String(download.method),
    });
    console.log('result', res);

    setLoading(false);
  };

  return [test, loading];
}
