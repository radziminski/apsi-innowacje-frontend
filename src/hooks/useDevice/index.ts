import { BREAKPOINTS } from '../../styles/variables';
import useViewportSize from '../useViewportSize';

const useDevice = () => {
  const { width } = useViewportSize();

  return {
    isDesktop: width <= BREAKPOINTS.desktop,
    isMobile: width <= BREAKPOINTS.mobile,
    isTab: width <= BREAKPOINTS.tab,
    isAdditionalBreakpointForDecisionsGrid: width <= 760,
    isWideTab: width <= BREAKPOINTS['wide-tab']
  };
};

export default useDevice;
