import Dexie from 'dexie';
import {habits, THabitsSlice} from '@entities/habit/model';

type TOnlyDB = Dexie & THabitsSlice;

const o1db = new Dexie('o1day') as TOnlyDB;
o1db.version(1).stores({
  ...habits(o1db),
});
