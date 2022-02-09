import React, { useEffect } from 'react';
import { FixedMenuWrapper } from '~/components/FixedMenuWrapper';
import { InspirationDetailsContent } from '~/pages/dashboard/inspirations/components/InspirationDetailsContent';
import useDevice from '~/hooks/useDevice';

export interface InspirationDetailsProps {
  inspirationId: number;
  onClose: () => void;
  isOpened?: boolean;
  className?: string;
  deleteComponent: JSX.Element;
  onDeleteComment: (commentId: number) => void;
}

export const InspirationDetails = (props: InspirationDetailsProps) => {
  const { isOpened, ...rest } = props;
  const { isTab } = useDevice();
  // hack for showing whole detail
  useEffect(() => {
    if (isOpened && isTab) {
      const mainElement = document.getElementsByClassName('inspiration-list--hidden');
      const mobileNavBar = document.getElementById('mobile-nav-bar');
      if (mobileNavBar && mainElement.length) {
        const mobileNavBarHeight = mobileNavBar.getBoundingClientRect().height;
        if (window.scrollY < mobileNavBarHeight) {
          let yOffset = mainElement[0].getBoundingClientRect().top;
          if (yOffset) {
            yOffset -= mobileNavBarHeight;
            // hack for showing whole detail
            window.scrollBy({
              top: yOffset,
              behavior: 'smooth'
            });
          }
        }
      }
    }
  }, [isOpened, isTab]);

  return (
    <FixedMenuWrapper isOpened={isOpened}>
      <InspirationDetailsContent {...rest} />
    </FixedMenuWrapper>
  );
};
