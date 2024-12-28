import {twMerge} from 'tailwind-merge';

export const styled = (className: string): React.FC<DivProps> =>
  function div(props) {
    return <div {...props} className={twMerge(className, props.className)} />;
  };
