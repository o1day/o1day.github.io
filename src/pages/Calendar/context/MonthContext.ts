import {createContext} from 'react';

type TMonthContext = Array<THabitRepeat[]> | undefined;

export const MonthContext = createContext<TMonthContext>([]);
