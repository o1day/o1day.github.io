import {getWeek} from './utils';

export const Header: React.FC = () => (
  <div className={'grid grid-cols-7 gap-xs bg-buccaneer-500 bg-opacity-20 rounded'}>
    {getWeek(new Date()).map((date) => (
      <div key={String(date)} className={'font-bold p-xs h-auto'}>
        {Intl.DateTimeFormat(navigator.language, {weekday: 'short'}).format(date)}
      </div>
    ))}
  </div>
);
