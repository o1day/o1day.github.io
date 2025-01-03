import Dexie, {EntityTable, Table} from 'dexie';
import {date2uday} from '@shared/lib/unixDateUtils.ts';

export type THabitsSlice = {
  habits: EntityTable<THabit, 'habit_id'>;
  habits_repeats: Table<THabitRepeat, [number, number]>;
};

export let habitsDB: Dexie & THabitsSlice;
export const habits = (dexieDB: Dexie & THabitsSlice) => {
  habitsDB = dexieDB;

  return {
    habits: '++habit_id',
    habits_repeats: '&[habit_id+unix_day], unix_day',
  };
};

export const insertHabit = (habit: Omit<THabit, 'habit_id'>) => habitsDB.habits.add(habit);

export const updateHabit = (habit_id: number, habit: Omit<THabit, 'habit_id'>) =>
  habitsDB.habits.update(habit_id, habit);

export const upsertHabit = ({habit_id, ...habit}: THabit) =>
  habit_id ? updateHabit(habit_id, habit) : insertHabit(habit);

export const repeatHabit = (habit_id: number, date: Date) =>
  habitsDB.habits_repeats.add({
    habit_id,
    unix_day: date2uday(date),
  });

export const deleteRepeat = ({habit_id, unix_day}: THabitRepeat) =>
  habitsDB.habits_repeats.delete([habit_id, unix_day]);

export const deleteHabit = (habit_id: number) =>
  habitsDB.transaction('rw', habitsDB.habits, habitsDB.habits_repeats, async () => {
    await habitsDB.habits_repeats.where({habit_id}).delete();
    await habitsDB.habits.delete(habit_id);
  });
