type TLogLevel = 'info' | 'log' | 'warn' | 'error';
type TLogger = Pick<typeof window.console, TLogLevel> & {
  catch: (reason: unknown) => never;
};

const logStyle = (color: string) =>
  `border: solid 1px ${color}; border-radius: 3px;
  font-weight: bold; color: ${color};
  padding: 0 2px`;

export const presets = {
  default: '#C57041',
  cloud: '#f54343',
  view: '#335cff',
};

export const consoleLogger = (name: string, color: string = presets.default): TLogger => {
  const bindLevel = (_: unknown, level: TLogLevel) =>
    console[level].bind(console, `%c${name.toUpperCase()}`, logStyle(color));

  return new Proxy({name}, {get: bindLevel}) as never;
};
