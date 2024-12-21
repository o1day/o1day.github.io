import {twMerge} from 'tailwind-merge';

export const styledDiv =
  (className: string): React.FC<DivProps> =>
  (props) => <div {...props} className={twMerge(className, props.className)} />;
