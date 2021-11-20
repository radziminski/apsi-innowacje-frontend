import React from 'react';
import { COLORS } from '~/styles/variables';
import { FlexBox } from '../Box';

export const MobileNavBar: React.FC = () => {
  return (
    <FlexBox background={COLORS.white} flexDirection="row-reverse" padding="2rem" minHeight="120px" alignItems="center">
      Przyszły tytuł
    </FlexBox>
  );
};

export default MobileNavBar;
