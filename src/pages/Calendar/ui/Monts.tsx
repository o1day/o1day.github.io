import React from 'react';
import {useLiveQuery} from 'dexie-react-hooks';

import {getFirstDayOfMonth, getLastDayOfMonth} from '@shared/ui/Calendar/dateUtils.ts';
import {THeadlessProps, Month as SharedMonth} from '@shared/ui/Calendar';
import {date2uday, uday2date} from '@shared/lib/unixDateUtils.ts';
import {MonthTitle} from '@shared/ui/Calendar/views.tsx';
import {habitsDB} from '@entities/habit/model';

import {MonthContext} from '../context/MonthContext.ts';

export const Month: React.FC<THeadlessProps> = React.memo(
  React.forwardRef(({date, WeekComponent, children}, ref) => {
    const from = date2uday(getFirstDayOfMonth(date));
    const till = date2uday(getLastDayOfMonth(date));

    const repeats = useLiveQuery(async () => {
      const repeats = await habitsDB.habits_repeats.where('unix_day').between(from, till).toArray();
      const result = new Array(32).fill(0).map(() => []) as Array<THabitRepeat[]>;

      repeats.forEach((r) => result[uday2date(r.unix_day).getDate()].push(r));
      return result;
    });

    return (
      <MonthContext.Provider value={repeats}>
        <SharedMonth
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
