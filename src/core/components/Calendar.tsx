import {useState, useLayoutEffect, useRef} from 'react';
import {getNextMonth, getPrevMonth} from '@libs/rh-calendar/utils.ts';
import {Month} from '@core/components/Month.tsx';

export const Calendar: React.FC = () => {
  const dateFormat = Intl.DateTimeFormat(navigator.language, {month: 'long', year: 'numeric'});
  const [months, setMonths] = useState([getPrevMonth(), new Date(), getNextMonth()]);

  const currentRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    currentRef.current?.scrollIntoView();

    calendarRef.current?.addEventListener('scroll', (event) => {
      const {scrollTop, scrollHeight, clientHeight} = event.target as HTMLDivElement;
      const triggerHeight = 100;

      if (scrollTop < triggerHeight) {
        setMonths((months) => [getPrevMonth(months.at(0)), ...months]);
      }

      if (scrollTop > scrollHeight - clientHeight - triggerHeight) {
        setMonths((months) => [...months, getNextMonth(months.at(-1))]);
      }
    });
  }, []);

  return (
    <div ref={calendarRef} className={'max-h-full overflow-scroll'}>
      {months.map((date, idx) => (
        <div
          ref={idx == 1 ? currentRef : undefined}
          key={`${date.getFullYear().toString()}-${date.getMonth().toString()}`}
        >
          <p className={'sticky top-0 p-xs bg-buccaneer-500 bg-opacity-20 rounded'}>
            {dateFormat.format(date)}
          </p>
          <Month date={date} />
        </div>
      ))}
    </div>
  );
};
