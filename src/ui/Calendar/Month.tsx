import {HeadlessMonth} from '@libs/rh-calendar';
import {getWeek} from '@libs/rh-calendar/utils';
import {dWrap} from '@ui/dwrap.tsx';

export const Day = dWrap('h-32 p-xs rounded bg-buccaneer-300 bg-opacity-10');
export const Week = dWrap('grid grid-cols-7 gap-xs');

export const WeekHeader: React.FC = () => (
  <Week className={'bg-buccaneer-500 bg-opacity-20 rounded'}>
    {getWeek(new Date()).map((date) => (
      <div key={String(date)} className={'font-bold p-xs h-auto'}>
        {Intl.DateTimeFormat(navigator.language, {weekday: 'short'}).format(date)}
      </div>
    ))}
  </Week>
);

export const Month: React.FC<DivProps & {date: Date}> = ({date, className = '', ...props}) => (
  <div {...props} className={`flex flex-col h-full gap-xs ${className}`}>
    <HeadlessMonth date={date} Row={Week}>
      {(date) => <Day key={String(date)}>{date.getDate()}</Day>}
    </HeadlessMonth>
  </div>
);
