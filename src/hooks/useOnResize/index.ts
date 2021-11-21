import { useEffect, useRef } from 'react';

const useOnResize = (onResizeCallback: () => void, debounceTimeMs?: number) => {
  const currDebounceTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let onResize = onResizeCallback;
    if (debounceTimeMs) {
      onResize = () => {
        currDebounceTimeout.current && clearTimeout(currDebounceTimeout.current);

        currDebounceTimeout.current = setTimeout(() => onResizeCallback(), debounceTimeMs);
      };
    }

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [onResizeCallback, debounceTimeMs]);
};

export default useOnResize;
