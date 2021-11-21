import React from 'react';
import { Center } from '../Box';
import { Container } from './parts';

export const Loader: React.FC = () => {
  return (
    <Container>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
};

export const CenteredLoader: React.FC = () => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};

export default Loader;
