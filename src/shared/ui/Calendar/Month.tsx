import React from 'react';

import {HeadlessCalendar, THeadlessProps} from './Headless.tsx';
import {MonthWrapper} from './views.tsx';

type TMonthProps = THeadlessProps & {
  HeadComponent: React.FC<{date: Date}>;
};

export const Month = React.memo(
  React.forwardRef(({HeadComponent, WeekComponent, children, date}: TMonthProps, ref) => (
    <MonthWrapper ref={ref as never}>
      <HeadComponent date={date} />
      <HeadlessCalendar WeekComponent={WeekComponent} date={date} children={children} />
    </MonthWrapper>
  )),
);
