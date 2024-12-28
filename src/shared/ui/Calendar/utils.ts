export const getMonth = (date: Date): TMonth => {
  const firstDay = getFirstDayOfWeek(getFirstDateOfMonth(date));

  const weekMap = (_: unknown, idx: number) =>
    getWeek(getDateByDate(firstDay, firstDay.getDate() + idx * 7));

  return new Array(getWeeksInMonth(date)).fill([]).map(weekMap);
};

export const getWeek = (date: Date): Date[] => {
  const firstDate = getFirstDayOfWeek(date);

  return new Array(7).fill(0).map((_, idx) => getDateByDate(firstDate, firstDate.getDate() + idx));
};

export const getWeeksInMonth = (date: Date): number =>
  Math.ceil((getDayOfWeek(getFirstDateOfMonth(date)) + getLastDateOfMonth(date).getDate()) / 7);

export const getFirstDayOfWeek = (date: Date): Date =>
  getDateByDate(date, date.getDate() - getDayOfWeek(date));

export const getFirstDateOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getLastDateOfMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getDayOfWeek = (date: Date) => (!date.getDay() ? 6 : date.getDay() - 1);

export const getDateByDate = (source: Date, date: number): Date =>
  new Date(source.getFullYear(), source.getMonth(), date);

export const getPrevMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() - 1);

export const getNextMonth = (date: Date = new Date()): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1);
