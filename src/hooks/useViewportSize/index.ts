import { getViewportSize } from './helpers';
import { useCallback, useState } from 'react';
import useOnResize from '../useOnResize';

const useViewportSize = () => {
  const [windowSize, setWindowSize] = useState<{
    height: number;
    width: number;
  }>(getViewportSize());

  const onResize = useCallback(() => {
    setWindowSize(getViewportSize());
  }, []);

  useOnResize(onResize, 100);

  return windowSize;
};

export default useViewportSize;
