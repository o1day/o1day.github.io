import {forwardRef} from 'react';

type TProps = React.PropsWithChildren<{date: Date}>;

export const Month = forwardRef(({date, children}: TProps, ref) => (
  <div ref={ref as never} className={'flex flex-col gap-xs'}>
    <p className={'sticky top-0 p-xs bg-buccaneer-500 bg-opacity-20 rounded'}>
      {Intl.DateTimeFormat(navigator.language, {month: 'long', year: 'numeric'}).format(date)}
    </p>
    {children}
  </div>
));
