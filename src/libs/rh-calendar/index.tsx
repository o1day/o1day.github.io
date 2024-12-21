import {useMemo} from 'react';
import {getMonth} from './utils.ts';

type TProps = {
  date: Date;
  Row: React.FC<React.PropsWithChildren>;
  children: React.FC<Date>;
};

export const HeadlessMonth: React.FC<TProps> = ({date, children, Row}) => {
  const monthMatrix = useMemo(() => getMonth(date), [date]);

  return monthMatrix.map((week, idx) => <Row key={idx}>{week.map(children)}</Row>);
};
