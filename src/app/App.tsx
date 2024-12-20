import {useYandexDisk} from '@core/hooks/useYandexDisk';

export const App: React.FC = () => {
  const [test] = useYandexDisk();

  return (
    <h1 className='flex flex-row items-center p-xs gap-xs text-buccaneer-500 text-2xl font-light'>
      <img src='/calendar.svg' className={'w-icon-md h-icon-md'} alt={'Test'} />
      <span>o1day</span>
      <span onClick={test} className={'cursor-pointer'}>
        ⚙️
      </span>
    </h1>
  );
};
