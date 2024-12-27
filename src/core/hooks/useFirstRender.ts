import {useRef} from 'react';

export const useFirstRender = (callback: () => unknown) => {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    callback();
  }
};
