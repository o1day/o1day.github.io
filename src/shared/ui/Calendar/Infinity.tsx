import {useState, useLayoutEffect, useRef} from 'react';

import {getNextMonth, getPrevMonth} from './utils.ts';
import {MonthCalendar} from './Month.tsx';

export const InfinityCalendar: React.FC = () => {
  const dateFormat = Intl.DateTimeFormat(navigator.language, {month: 'long', year: 'numeric'});
  const [months, setMonths] = useState([getPrevMonth(), new Date(), getNextMonth()]);

  const currentRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const effectFired = useRef(false);

  useLayoutEffect(() => {
    if (effectFired.current) {
      return;
    }

    currentRef.current?.scrollIntoView();
    effectFired.current = true;

    calendarRef.current?.addEventListener('scroll', (event) => {
      const {scrollTop, scrollHeight, clientHeight} = event.target as HTMLDivElement;
      const triggerHeight = clientHeight / 2;

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
        <div ref={idx == 1 ? currentRef : undefined} key={String(date)}>
          <p className={'sticky top-0 p-xs bg-buccaneer-500 bg-opacity-20 rounded'}>
            {dateFormat.format(date)}
          </p>
          <MonthCalendar date={date} />
        </div>
      ))}
    </div>
  );
};
