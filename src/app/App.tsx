import {useState} from 'react';

import {InfinityCalendar, WeekHeader} from '@ui/Calendar';
import {useStorage} from '@core/hooks/useStorage';
import {YandexId} from '@libs/yandex-id';

import {AppContext, TAppContext, TAuth} from './context/AppContext';
import {Layout, Header} from './views';

export const App: React.FC = () => {
  const [auth, saveAuth] = useStorage<TAuth>('auth', true);
  const [appContext, setAppContext] = useState<TAppContext>({auth: auth ?? undefined});

  const setAuth = (auth: TAuth) => {
    setAppContext((context) => ({...context, auth}));
    saveAuth(auth);
  };

  return (
    <Layout>
      <AppContext.Provider value={appContext}>
        <Header>
          {auth ? (
            <div className={'h-10 w-10 bg-buccaneer-500 bg-opacity-40 rounded-full'}>
              <h1 className={'text-3xl text-center p-xs'}>🐼</h1>
            </div>
          ) : (
            <>
              <YandexId setAuth={setAuth} />
            </>
          )}
        </Header>
        <WeekHeader />
        <InfinityCalendar />
      </AppContext.Provider>
    </Layout>
  );
};
