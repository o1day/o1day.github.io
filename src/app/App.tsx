import {useMemo} from 'react';

import {YandexAuth} from '@shared/clouds/yandex/Auth';
import {useLocalStorage} from '@shared/hooks/useLocalStorage';

import {CloudContext, createContextByAccess, emptyAccess} from './context/CloudContext';
import type {TCloudAccess, TCloudContext} from './context/CloudContext';
import {Calendar} from './pages/Calendar';
import {Profile} from './widgets/Profile';
import {Header, Layout} from './views';

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
