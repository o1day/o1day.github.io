import {Header} from '@core/components/Month.tsx';
import {Header as AppHeader} from './components/Header.tsx';
import {Calendar} from '@core/components/Calendar.tsx';

export const App: React.FC = () => {
  return (
    <div className='flex flex-col max-h-full p-sm gap-xs'>
      <AppHeader />
      <Header />
      <Calendar />
    </div>
  );
};
