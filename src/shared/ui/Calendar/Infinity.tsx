import {useState, useLayoutEffect, useRef} from 'react';

import {getNextMonth, getPrevMonth} from './dateUtils.ts';
import {THeadlessProps} from './Headless.tsx';
import {InfinityWrapper} from './views.tsx';

type TProps = THeadlessProps & {
  MonthComponent: React.FC<THeadlessProps & {ref: React.Ref<HTMLElement>}>;
};

export const InfinityCalendar: React.FC<TProps> = ({MonthComponent, date, ...props}) => {
  const [months, setMonths] = useState(() => [getPrevMonth(date), date, getNextMonth(date)]);

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
    <InfinityWrapper ref={calendarRef}>
      {months.map((date, idx) => (
        <MonthComponent
          key={String(date)}
          ref={idx == 1 ? currentRef : null}
          date={date}
          {...props}
        />
      ))}
    </InfinityWrapper>
  );
};
