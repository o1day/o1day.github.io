import {createContext} from 'react';

type TCalendarContext = {habits: Record<number, THabit> | undefined};

export const CalendarContext = createContext<TCalendarContext>({habits: {}});
