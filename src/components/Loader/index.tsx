import React from 'react';
import { Center } from '../Box';
import { Container } from './parts';

interface Props {
  size?: number;
  color?: string;
  borderSize?: number;
  margin?: number;
}

export const Loader: React.FC<Props> = props => {
  return (
    <Container {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
};

export const CenteredLoader: React.FC<Props> = props => {
  return (
    <Center>
      <Loader {...props} />
    </Center>
  );
};

export default Loader;
