import React from 'react';
import Box, { FlexBox } from '~/components/Box';
import MobileNavBar from '~/components/MobileNavBar';
import SideBar from '~/components/SideBar';
import useDevice from '~/hooks/useDevice';
import { COLORS } from '~/styles/variables';

export const DashboardLayout: React.FC = ({ children }) => {
  const { isTab } = useDevice();

  return (
    <FlexBox width="100%" minHeight="100vh" flexDirection={isTab ? 'column' : 'row'}>
      <SideBar />
      {isTab && <MobileNavBar />}
      <Box flex={1} background={COLORS.background}>
        {children}
      </Box>
    </FlexBox>
  );
};

export default DashboardLayout;
