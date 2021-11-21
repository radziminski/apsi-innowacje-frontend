import React from 'react';
import { COLORS, Z_INDEX } from '~/styles/variables';
import { FlexBox } from '../Box';

export const MOBILE_NAVBAR_HEIGHT = 120;

export const MobileNavBar: React.FC = () => {
  return (
    <FlexBox
      background={COLORS.white}
      position="fixed"
      top={0}
      left={0}
      right={0}
      flexDirection="row-reverse"
      padding="2rem"
      height={MOBILE_NAVBAR_HEIGHT}
      zIndex={Z_INDEX.stickedBack}
      alignItems="center">
      Przyszły tytuł
    </FlexBox>
  );
};

export default MobileNavBar;
