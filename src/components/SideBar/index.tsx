import React from 'react';
import Box, { FlexBox } from '../Box';
import Logo from '../Logo';
import Nav from '../Nav';

export const SideBar: React.FC = () => {
  return (
    <FlexBox width={250} padding="3rem 0" flexDirection="column">
      <Box padding="0 2rem" marginBottom="3rem">
        <Logo />
      </Box>
      <Nav />
    </FlexBox>
  );
};

export default SideBar;
