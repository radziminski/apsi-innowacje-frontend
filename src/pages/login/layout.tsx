import React from 'react';
import Box, { FlexBox } from '~/components/Box';
import { COLORS } from '~/styles/variables';

export const LoginLayout: React.FC = ({ children }) => {
  return (
    <FlexBox height="100vh" width="100vw">
      <Box flex={1} background={COLORS.background}>
        {children}
      </Box>
    </FlexBox>
  );
};

export default LoginLayout;
