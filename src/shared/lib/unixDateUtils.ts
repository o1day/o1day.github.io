const DAY_SEC = 24 * 3_600;

export const date2unix = (date: Date) => Math.ceil(date.getTime() / 1_000);
export const unix2date = (unix: number) => new Date(unix * 1_000);

export const date2uday = (date: Date) => Math.ceil(date2unix(date) / DAY_SEC);
export const uday2date = (day: number) => unix2date(day * DAY_SEC);

export const unixMonth = (date: Date) => (date.getFullYear() - 1970) * 12 + date.getMonth();
