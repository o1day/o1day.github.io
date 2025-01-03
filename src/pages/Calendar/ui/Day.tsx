import React, {useContext} from 'react';

import {repeatHabit, deleteRepeat} from '@entities/habit/model';
import {useToggleFlag} from '@shared/hooks/useToggleFlag.ts';
import {DayWrapper} from '@shared/ui/Calendar/views.tsx';

import {CalendarContext} from '../context/CalendarContext.ts';
import {useMonthContext} from '../hooks/useMonthContext.ts';

export const Day: React.FC<React.PropsWithChildren<{date: Date}>> = React.memo(
  ({date, children}) => {
    const {habits} = useContext(CalendarContext);
    const repeats = useMonthContext(date);

    const [showHabits, toggleHabits] = useToggleFlag();

    const addRepeat = (habit_id: number) => () => {
      void repeatHabit(habit_id, date);
      toggleHabits();
    };

    const removeRepeat =
      (repeat: THabitRepeat): React.MouseEventHandler =>
      (e) => {
        void deleteRepeat(repeat);
        e.stopPropagation();
      };

    return (
      <DayWrapper key={String(date)}>
        {repeats.map((repeat) => (
          <span key={repeat.habit_id} onClick={removeRepeat(repeat)}>
            {habits?.[repeat.habit_id].icon}
          </span>
        ))}
        {showHabits ? (
          Object.values(habits ?? {}).map((h) => (
            <li key={h.habit_id} onClick={addRepeat(h.habit_id)}>
              {h.icon}
            </li>
          ))
        ) : (
          <span onClick={toggleHabits}>+</span>
        )}
        {children}
      </DayWrapper>
    );
  },
);
