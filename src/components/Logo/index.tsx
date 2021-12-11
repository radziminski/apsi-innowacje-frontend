import React from 'react';
import { COLORS, FONT_WEIGHTS } from '~/styles/variables';
import Box, { FlexBox } from '../Box';
import { Heading1 } from '../Text';
import { FaLightbulb } from 'react-icons/fa';
import { defaultTheme } from '~/styles/theme';

export const Logo: React.FC = () => {
  return (
    <FlexBox alignItems="center" height="1.5rem" margin={defaultTheme.spacing.s}>
      <Box marginRight="1rem" marginBottom="-0.2rem">
        <FaLightbulb size={26} color={COLORS.primary} />
      </Box>
      <Heading1 fontSize="2rem" fontWeight={FONT_WEIGHTS.semiBold} color={COLORS.primaryDark} letterSpacing="-0.05rem">
        Innowacje
      </Heading1>
    </FlexBox>
  );
};

export default Logo;
