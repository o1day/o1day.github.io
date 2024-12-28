import {useMemo} from 'react';

import {Profile} from '@widgets/Profile';
import {Calendar} from '@pages/Calendar';

import {YandexAuth} from '@shared/api/yandex/Auth.tsx';
import {useLocalStorage} from '@shared/hooks/useLocalStorage.ts';

import type {TCloudAccess, TCloudContext} from './context/CloudContext.ts';
import {CloudContext, createContextByAccess, emptyAccess} from './context/CloudContext.ts';
import {Header, Layout} from './ui';

export const App: React.FC = () => {
  const [access, saveAccess] = useLocalStorage<TCloudAccess>('cloud_access', true, emptyAccess);
  const cloudContext = useMemo<TCloudContext>(() => createContextByAccess(access), [access]);

  const onAccess = (provider: TCloudProvider) => (credentials: unknown) => {
    saveAccess({provider, credentials});
  };

  return (
    <Layout>
      <CloudContext.Provider value={cloudContext}>
        <Header>
          {access.provider !== 'empty' ? <Profile /> : <YandexAuth onAccess={onAccess('yandex')} />}
        </Header>
        <Calendar />
      </CloudContext.Provider>
    </Layout>
  );
};
