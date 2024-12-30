import React, {createContext, useContext} from 'react';
import Dexie, {type EntityTable} from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';

import {unixMonth} from '@shared/lib/unixMonth.ts';

import {THeadlessProps, Month, InfinityCalendar} from '@shared/ui/Calendar';
import {MonthTitle, WeekWrapper, DayWrapper} from '@shared/ui/Calendar/views.tsx';

type THabit = {
  id: number;
  name: string;
  date: Date;
  month: number;
};

type TDb = {
  habits: EntityTable<THabit, 'id'>;
};

const db = new Dexie('o1day') as Dexie & TDb;
db.version(1).stores({
  habits: '++id, name, date, month',
});

type TMonthContext = Array<THabit[]> | undefined;
const MonthContext = createContext<TMonthContext>([]);
const useMonthContext = (date: Date) => useContext(MonthContext)?.[date.getDate()] ?? [];

const MonthWrapper: React.FC<THeadlessProps> = React.memo(
  React.forwardRef(({date, WeekComponent, children}, ref) => {
    const month = unixMonth(date);
    const habits = useLiveQuery(() =>
      db.habits
        .where('month')
        .equals(month)
        .toArray()
        .then((habits) => {
          const result = new Array(32).fill(0).map(() => []) as Array<THabit[]>;

          habits.forEach((h) => result[h.date.getDate()].push(h));

          return result;
        }),
    );

    console.count(`render:${String(month)}`);

    return (
      <MonthContext.Provider value={habits}>
        <Month
          date={date}
          ref={ref}
          WeekComponent={WeekComponent}
          HeadComponent={MonthTitle}
          children={children}
        />
      </MonthContext.Provider>
    );
  }),
);

export const Calendar: React.FC = () => {
  const date = new Date();
  return (
    <InfinityCalendar date={date} MonthComponent={MonthWrapper} WeekComponent={WeekWrapper}>
      {(date: Date) => (
        <DayConnected date={date} key={String(date)}>
          {date.getDate()}
        </DayConnected>
      )}
    </InfinityCalendar>
  );
};

const DayConnected: React.FC<React.PropsWithChildren<{date: Date}>> = React.memo(
  ({date, children}) => {
    const addHabit = (date: Date) => () => {
      const name = prompt('Enter the name');
      if (name) {
        const h = {name, date, month: unixMonth(date)};
        void db.habits.add(h);
      }
    };

    const removeHabit =
      (id: number): React.MouseEventHandler =>
      (e) => {
        void db.habits.delete(id);
        e.stopPropagation();
      };

    const habits = useMonthContext(date);

    return (
      <DayWrapper key={String(date)} onClick={addHabit(date)}>
        {habits.map((h) => (
          <span key={h.id} onClick={removeHabit(h.id)}>
            {h.name}
          </span>
        ))}
        {children}
      </DayWrapper>
    );
  },
);
