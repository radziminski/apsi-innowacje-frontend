import { BREAKPOINTS } from '../../styles/variables';
import useViewportSize from '../useViewportSize';

const useDevice = () => {
  const { width } = useViewportSize();

  return {
    isDesktop: width <= BREAKPOINTS.desktop,
    isMobile: width <= BREAKPOINTS.mobile,
    isTab: width <= BREAKPOINTS.tab,
  };
};

export default useDevice;
