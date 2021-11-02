import React from 'react';
import Box, { FlexBox } from '../Box';
import Logo from '../Logo';
import Nav from '../Nav';

export const SideBar: React.FC = () => {
  return (
    <FlexBox width={250} padding="3rem 2rem" flexDirection="column">
      <Logo />
      <Box marginBottom="2rem" />
      <Nav />
    </FlexBox>
  );
};

export default SideBar;
