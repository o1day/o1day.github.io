export const StatusView: React.FC<{status: TCloudStatus}> = ({status}) => {
  switch (status) {
    case true:
      return <div className={'w-3 h-3 absolute right-0 top-0 rounded-full bg-green-500'} />;
    case false:
      return <div className={'w-3 h-3 absolute right-0 top-0  rounded-full bg-yellow-500'} />;
    case undefined:
      return <div className={'w-3 h-3 absolute right-0 top-0  rounded-full bg-gray-500'} />;
    default:
      return <div className={'w-3 h-3 absolute right-0 top-0  rounded-full bg-red-500'} />;
  }
};
