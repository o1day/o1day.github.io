import {YandexAccept} from '@libs/yandex-id/accept.tsx';

export const Auth: React.FC = () => {
  const {pathname, hash} = window.location;
  const provider = pathname.replace('/auth/', '');
  const params = Object.fromEntries(new URLSearchParams(hash));

  return (
    <div className={'flex flex-col justify-center h-full font-mono mx-auto w-fit'}>
      <YandexAccept />
      <h1 className={'font-bold'}>Provider: {provider}</h1>
      <p className={'whitespace-pre p-md rounded bg-buccaneer-500 bg-opacity-40'}>
        {JSON.stringify(params, null, 2)}
      </p>
    </div>
  );
};
