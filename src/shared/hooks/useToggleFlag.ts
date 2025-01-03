import {useCallback, useState} from 'react';

export const useToggleFlag = (value = false): [boolean, VoidFunction] => {
  const [flag, setFlag] = useState(value);
  const toggleFlag = useCallback(() => {
    setFlag((flag) => !flag);
  }, []);

  return [flag, toggleFlag];
};
