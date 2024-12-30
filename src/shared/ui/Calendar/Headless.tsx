import {getMonth} from './dateUtils.ts';

export type THeadlessProps = {
  WeekComponent: React.FC<React.PropsWithChildren>;
  children: React.FC<Date>;
  date: Date;
};

export const HeadlessCalendar: React.FC<THeadlessProps> = ({WeekComponent, children, date}) =>
  getMonth(date).map((week, idx) => <WeekComponent key={idx}>{week.map(children)}</WeekComponent>);
