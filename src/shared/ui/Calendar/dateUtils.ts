export const getMonthDates = (date: Date): TMonth => {
  const firstDay = getFirstDayOfWeek(getFirstDayOfMonth(date));

  const weekMap = (_: unknown, idx: number) =>
    getWeekDates(copyYearAndMonth(firstDay, firstDay.getDate() + idx * 7));

  return new Array(getWeeksInMonth(date)).fill([]).map(weekMap);
};

export const getWeekDates = (date: Date): Date[] => {
  const firstDate = getFirstDayOfWeek(date);
  const fillWeek = (_: unknown, day: number) =>
    copyYearAndMonth(firstDate, firstDate.getDate() + day);

  return new Array(7).fill(0).map(fillWeek);
};

export const getWeeksInMonth = (date: Date): number =>
  Math.ceil((getDayOfWeek(getFirstDayOfMonth(date)) + getLastDayOfMonth(date).getDate()) / 7);

export const getFirstDayOfWeek = (date: Date): Date =>
  copyYearAndMonth(date, date.getDate() - getDayOfWeek(date));

export const getFirstDayOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);

export const getLastDayOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

export const getDayOfWeek = (date: Date) => (!date.getDay() ? 6 : date.getDay() - 1);

export const copyYearAndMonth = (source: Date, ...args: number[]): Date =>
  new Date(source.getFullYear(), source.getMonth(), ...args);

export const getPrevMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() - 1);

export const getNextMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1);
