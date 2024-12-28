export const ProfileView: React.FC<React.PropsWithChildren> = ({children}) => (
  <div className={'h-10 w-10 bg-buccaneer-500 bg-opacity-40 rounded-full relative cursor-pointer'}>
    <h1 className={'text-3xl text-center p-xs'}>🐼</h1>
    {children}
  </div>
);
