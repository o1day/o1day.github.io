export const Header: React.FC<React.PropsWithChildren> = ({children}) => (
  <h1 className='flex flex-row items-center gap-xs text-buccaneer-500 text-2xl font-light'>
    <img src='/calendar.svg' className={'w-icon-md h-icon-md'} alt={'Test'} />
    <span className={'font-mono'}>only one day</span>
    <div className={'flex flex-row justify-end grow'}>{children}</div>
  </h1>
);