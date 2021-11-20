import React from 'react';
import { FixedMenuWrapper } from '~/components/FixedMenuWrapper';
import { InspirationDetailsContent } from '~/pages/dashboard/inspiration-page/components/InspirationDetailsContent';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';

export interface InspirationDetailsProps {
  inspiration: InspirationModel;
  onClose: () => void;
  isOpened?: boolean;
  className?: string;
}

export const InspirationDetails = (props: InspirationDetailsProps) => {
  const { isOpened, ...rest } = props;
  return (
    <FixedMenuWrapper isOpened={isOpened}>
      <InspirationDetailsContent {...rest} />
    </FixedMenuWrapper>
  );
};
