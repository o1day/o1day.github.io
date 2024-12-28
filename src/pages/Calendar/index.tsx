import {InfinityCalendar} from '@shared/ui/Calendar/Infinity';
import {Day, Week, Month} from './ui';

export const Calendar: React.FC = () => (
  <InfinityCalendar Month={Month} Week={Week}>
    {(date) => <Day key={String(date)}>{date.getDay()}</Day>}
  </InfinityCalendar>
);
