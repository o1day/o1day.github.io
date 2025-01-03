import {useContext} from 'react';
import {MonthContext} from '../context/MonthContext';

export const useMonthContext = (date: Date) => useContext(MonthContext)?.[date.getDate()] ?? [];
