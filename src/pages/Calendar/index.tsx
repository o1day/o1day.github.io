import React from 'react';
import {useLiveQuery} from 'dexie-react-hooks';

import {WeekWrapper} from '@shared/ui/Calendar/views.tsx';
import {InfinityCalendar} from '@shared/ui/Calendar';
import {habitsDB} from '@entities/habit/model';

import {CalendarContext} from './context/CalendarContext.ts';
import {Month} from './ui/Monts.tsx';
import {Day} from './ui/Day.tsx';

export const Calendar: React.FC = () => {
  const date = new Date();
  const habits = useLiveQuery(async () => {
    const habits = await habitsDB.habits.toArray();
    return Object.fromEntries(habits.map((h) => [h.habit_id, h]));
  });

  return (
    <CalendarContext value={{habits}}>
      <InfinityCalendar date={date} MonthComponent={Month} WeekComponent={WeekWrapper}>
        {(date: Date) => (
          <Day date={date} key={String(date)}>
            {date.getDate()}
          </Day>
        )}
      </InfinityCalendar>
    </CalendarContext>
  );
};
