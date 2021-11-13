import React from 'react';
import { Center } from '../Box';
import RollerLoader from '../RollerLoader';

export const LoadingOverlay: React.FC = () => {
  return (
    <Center width="100%" height="100vh">
      <RollerLoader />
    </Center>
  );
};

export default LoadingOverlay;
