import {useState, useLayoutEffect, useRef} from 'react';

import {HeadlessCalendar} from './Headless.tsx';
import {getNextMonth, getPrevMonth} from './utils.ts';

type TProps = {
  Month: React.FC<React.PropsWithChildren<{ref: React.Ref<HTMLElement>; date: Date}>>;
  Week: React.FC<React.PropsWithChildren>;
  children: React.FC<Date>;
};

export const InfinityCalendar: React.FC<TProps> = ({Month, Week, children}) => {
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
        <Month ref={idx == 1 ? currentRef : null} key={String(date)} date={date}>
          <HeadlessCalendar Row={Week} date={date} children={children} />
        </Month>
      ))}
    </div>
  );
};
