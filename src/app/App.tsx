import {useState} from 'react';
import {HeadlessMonth} from '@libs/rh-calendar';
import {getWeek} from '@libs/rh-calendar/utils.ts';

type DivProps = React.HTMLProps<HTMLDivElement>;

const Row: React.FC<DivProps> = (props) => (
  <div {...props} className={`flex flex-row ${props.className ?? ''}`} />
);

const Cell: React.FC<React.PropsWithChildren<DivProps>> = ({children, ...props}) => (
  <div {...props} className={`w-1/12 p-xs m-xs rounded ${props.className ?? ''}`}>
    {children}
  </div>
);

const Day: React.FC<React.PropsWithChildren> = ({children}) => (
  <Cell className='bg-buccaneer-800 bg-opacity-10'>{children}</Cell>
);

const Link: React.FC<DivProps> = (props) => (
  <div
    {...props}
    className={`text-amber-700 cursor-pointer hover:underline ${props.className ?? ''}`}
  />
);

export const App: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const locale = navigator.language;
  const week = getWeek(date);

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  return (
    <div className='flex flex-col'>
      <h1 className='flex flex-row items-center p-xs gap-xs text-buccaneer-500 text-2xl font-light'>
        <img src='/calendar.svg' className={'w-icon-md h-icon-md'} alt={'Test'} />
        <span className={'font-mono'}>only_one_day</span>
      </h1>

      <Row className='gap-xs'>
        <Link onClick={prevMonth}>Prev</Link>
        {Intl.DateTimeFormat(locale, {month: 'long'}).format(date)}
        <span>/</span>
        {Intl.DateTimeFormat(locale, {year: 'numeric'}).format(date)}
        <Link onClick={nextMonth}>Next</Link>
      </Row>
      <Row>
        {week.map((date) => (
          <Cell key={date.getDay()} className={'bg-buccaneer-800 bg-opacity-30 font-bold'}>
            {Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date)}
          </Cell>
        ))}
      </Row>
      <HeadlessMonth date={date} Row={Row}>
        {(date) => <Day key={date.getDate()}>{date.getDate()}</Day>}
      </HeadlessMonth>
    </div>
  );
};
