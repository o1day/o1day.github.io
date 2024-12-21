import {HeadlessMonth} from '@libs/rh-calendar';
import {styledDiv} from '@core/hoc/styledDiv';
import {getWeek} from '@libs/rh-calendar/utils.ts';

export const Day = styledDiv('h-32 p-xs rounded bg-buccaneer-300 bg-opacity-10');
export const Week = styledDiv('grid grid-cols-7 gap-xs');

export const Header: React.FC = () => (
  <Week className={'bg-buccaneer-500 bg-opacity-20 rounded'}>
    {getWeek(new Date()).map((date) => (
      <div key={date.getDay()} className={'font-bold p-xs h-auto'}>
        {Intl.DateTimeFormat(navigator.language, {weekday: 'short'}).format(date)}
      </div>
    ))}
  </Week>
);

export const Month: React.FC<DivProps & {date: Date}> = ({date, className = '', ...props}) => (
  <div {...props} className={`flex flex-col h-full gap-xs ${className}`}>
    <HeadlessMonth date={date} Row={Week}>
      {(date) => <Day key={date.getDate()}>{date.getDate()}</Day>}
    </HeadlessMonth>
  </div>
);
