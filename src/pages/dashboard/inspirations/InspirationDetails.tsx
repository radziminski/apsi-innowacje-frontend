import React, { useEffect } from 'react';
import { FixedMenuWrapper } from '~/components/FixedMenuWrapper';
import { InspirationDetailsContent } from '~/pages/dashboard/inspirations/components/InspirationDetailsContent';
import { InspirationModel } from '~/pages/dashboard/inspirations/InspirationPage';

export interface InspirationDetailsProps {
  inspiration: InspirationModel;
  onClose: () => void;
  isOpened?: boolean;
  className?: string;
}

export const InspirationDetails = (props: InspirationDetailsProps) => {
  const { isOpened, ...rest } = props;
  // hack for showing whole detail
  useEffect(() => {
    if (isOpened) {
      const mainElement = document.getElementsByClassName('inspiration-list--hidden');
      if (mainElement.length) {
        const yOffset = mainElement[0].getBoundingClientRect().top;
        if (yOffset) {
          // hack for showing whole detail
          window.scrollBy({
            top: yOffset,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [isOpened]);

  return (
    <FixedMenuWrapper isOpened={isOpened}>
      <InspirationDetailsContent {...rest} />
    </FixedMenuWrapper>
  );
};
