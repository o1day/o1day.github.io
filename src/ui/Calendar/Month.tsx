import {styled} from '@ui/styled';

import {HeadlessCalendar} from './Headless';
import {getWeek} from './utils';

export const Day = styled('h-32 p-xs rounded bg-buccaneer-300 bg-opacity-10');
export const Week = styled('grid grid-cols-7 gap-xs');

export const WeekHeader: React.FC = () => (
  <Week className={'bg-buccaneer-500 bg-opacity-20 rounded'}>
    {getWeek(new Date()).map((date) => (
      <div key={String(date)} className={'font-bold p-xs h-auto'}>
        {Intl.DateTimeFormat(navigator.language, {weekday: 'short'}).format(date)}
      </div>
    ))}
  </Week>
);

type TProps = DivProps & {date: Date};

export const MonthCalendar: React.FC<TProps> = ({date, className = '', ...props}) => (
  <div {...props} className={`flex flex-col h-full gap-xs ${className}`}>
    <HeadlessCalendar date={date} Row={Week}>
      {(date) => <Day key={String(date)}>{date.getDate()}</Day>}
    </HeadlessCalendar>
  </div>
);
