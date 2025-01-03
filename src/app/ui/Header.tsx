type TProps = React.PropsWithChildren<{
  onSettings: VoidFunction;
}>;

export const Header: React.FC<TProps> = ({children, onSettings}) => (
  <h1 className='flex flex-row items-center gap-xs text-buccaneer-500 text-2xl font-light'>
    <img src='/calendar.svg' className={'w-icon-md h-icon-md'} alt={'Test'} />
    <span className={'font-mono'}>only one day</span>
    <div className={'flex flex-row gap-xs justify-end grow'}>
      <div className={'w-10 h-10 cursor-pointer'} onClick={onSettings}>
        <span className={'text-4xl'}>⚙</span>
      </div>
      {children}
    </div>
  </h1>
);
