import {styled} from '../../hoc/styled.tsx';
import {getWeekDates} from './dateUtils.ts';

export const InfinityWrapper = styled('max-h-full overflow-scroll');
export const MonthWrapper = styled('flex flex-col gap-xs');
export const WeekWrapper = styled('grid grid-cols-7 gap-xs');
export const DayWrapper = styled('h-32 p-xs rounded bg-buccaneer-300 bg-opacity-10');

export const MonthHeader = styled('sticky top-0 p-xs bg-buccaneer-500 bg-opacity-20 rounded');
export const WeekHeader = styled('grid grid-cols-7 gap-xs bg-buccaneer-500 bg-opacity-20 rounded');

export const MonthTitle: React.FC<{date: Date}> = ({date}) => (
  <MonthHeader>
    {Intl.DateTimeFormat(navigator.language, {month: 'long', year: 'numeric'}).format(date)}
  </MonthHeader>
);

export const WeekTitle: React.FC = () => (
  <WeekHeader>
    {getWeekDates(new Date()).map((date) => (
      <div key={String(date)} className={'font-bold p-xs h-auto'}>
        {Intl.DateTimeFormat(navigator.language, {weekday: 'short'}).format(date)}
      </div>
    ))}
  </WeekHeader>
);
