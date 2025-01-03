import {useState} from 'react';
import {useLiveQuery} from 'dexie-react-hooks';

import {habitsDB, upsertHabit} from '@entities/habit/model';

export const HabitSettings: React.FC = () => {
  const habits = useLiveQuery(() => habitsDB.habits.toArray());
  const [habit, setHabit] = useState<THabit>({habit_id: 0, name: '', icon: ''});

  const onChangeHabit = (prop: keyof THabit, value: THabit[keyof THabit]) => {
    setHabit((habit) => ({...habit, [prop]: value}));
  };

  const onSelectHabit = (id: number) => () => {
    const habit = habits?.find((h) => h.habit_id === id);
    if (habit) {
      setHabit(habit);
    }
  };

  const onSaveHabit = () => {
    void upsertHabit(habit);
    setHabit({habit_id: 0, name: '', icon: ''});
  };

  return (
    <div>
      <h1>Habits</h1>
      <ul>
        {habits?.map((habit) => (
          <li key={habit.habit_id} onClick={onSelectHabit(habit.habit_id)}>
            {habit.habit_id}
            {habit.icon}
            {habit.name}
          </li>
        ))}
      </ul>
      <div className={'flex flex-col gap-xs w-64'}>
        <input
          type='text'
          name={'icon'}
          value={habit.icon}
          placeholder='icon'
          onChange={(e) => {
            onChangeHabit('icon', e.target.value);
          }}
        />
        <input
          type='text'
          name={'name'}
          value={habit.name}
          placeholder='name'
          onChange={(e) => {
            onChangeHabit('name', e.target.value);
          }}
        />
        <button onClick={onSaveHabit}>+add</button>
      </div>
    </div>
  );
};
