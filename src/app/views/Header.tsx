import {useYandexDisk} from '@core/hooks/useYandexDisk';

export const Header: React.FC<React.PropsWithChildren> = ({children}) => {
  const [connect, loading, status] = useYandexDisk();

  return (
    <h1 className='flex flex-row items-center gap-xs text-buccaneer-500 text-2xl font-light'>
      <img src='/calendar.svg' className={'w-icon-md h-icon-md'} alt={'Test'} />
      <span className={'font-mono'}>only one day</span>
      <div
        className={
          'w-10 h-10 text-2xl text-center p-xs cursor-pointer hover:bg-buccaneer-500 hover:bg-opacity-40 rounded-full'
        }
        onClick={connect}
      >
        {loading ? '💡' : status === undefined ? '❓' : status ? '✅' : '❌'}
      </div>
      <div className={'flex flex-row justify-end grow'}>{children}</div>
    </h1>
  );
};
