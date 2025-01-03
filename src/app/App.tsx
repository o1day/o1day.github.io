import {useMemo} from 'react';

import {Profile} from '@widgets/Profile';
import {Calendar} from '@pages/Calendar';
import {Settings} from '@pages/Settings';

import {YandexAuth} from '@shared/api/yandex/Auth.tsx';
import {useToggleFlag} from '@shared/hooks/useToggleFlag.ts';
import {useLocalStorage} from '@shared/hooks/useLocalStorage.ts';

import type {TCloudAccess, TCloudContext} from './context/CloudContext.ts';
import {CloudContext, createContextByAccess, emptyAccess} from './context/CloudContext.ts';
import {Header, Layout} from './ui';
import './o1db.ts';

export const App: React.FC = () => {
  const [access, saveAccess] = useLocalStorage<TCloudAccess>('cloud_access', true, emptyAccess);
  const cloudContext = useMemo<TCloudContext>(() => createContextByAccess(access), [access]);

  const onAccess = (provider: TCloudProvider) => (credentials: unknown) => {
    saveAccess({provider, credentials});
  };

  const [showSettings, toggleSettings] = useToggleFlag();

  return (
    <Layout>
      <CloudContext.Provider value={cloudContext}>
        <Header onSettings={toggleSettings}>
          {access.provider !== 'empty' ? <Profile /> : <YandexAuth onAccess={onAccess('yandex')} />}
        </Header>
        {showSettings ? <Settings /> : <Calendar />}
      </CloudContext.Provider>
    </Layout>
  );
};
