export const getMonth = (date: Date): TMonth => {
  const firstDay = getFirstDayOfWeek(getFirstDateOfMonth(date));

  const weekMap = (_: unknown, idx: number) =>
    getWeek(copyYearAndMonth(firstDay, firstDay.getDate() + idx * 7));

  return new Array(getWeeksInMonth(date)).fill([]).map(weekMap);
};

export const getWeek = (date: Date): Date[] => {
  const firstDate = getFirstDayOfWeek(date);
  const fillWeek = (_: unknown, day: number) =>
    copyYearAndMonth(firstDate, firstDate.getDate() + day);

  return new Array(7).fill(0).map(fillWeek);
};

export const getWeeksInMonth = (date: Date): number =>
  Math.ceil((getDayOfWeek(getFirstDateOfMonth(date)) + getLastDateOfMonth(date).getDate()) / 7);

export const getFirstDayOfWeek = (date: Date): Date =>
  copyYearAndMonth(date, date.getDate() - getDayOfWeek(date));

export const getFirstDateOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getLastDateOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getDayOfWeek = (date: Date) => (!date.getDay() ? 6 : date.getDay() - 1);

export const copyYearAndMonth = (source: Date, date: number): Date =>
  new Date(source.getFullYear(), source.getMonth(), date);

export const getPrevMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() - 1);

export const getNextMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1);
