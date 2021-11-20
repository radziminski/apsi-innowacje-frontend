import React from 'react';
import Box, { FlexBox } from '~/components/Box';
import SideBar from '~/components/SideBar';
import { COLORS } from '~/styles/variables';

export const DashboardLayout: React.FC = ({ children }) => {
  return (
    <FlexBox width="100%" minHeight="100vh">
      <SideBar />
      <Box flex={1} background={COLORS.background}>
        {children}
      </Box>
    </FlexBox>
  );
};

export default DashboardLayout;
