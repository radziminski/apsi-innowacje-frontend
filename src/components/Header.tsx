import React from 'react';
import { Center } from '~/components/Box';
import { Heading1 } from '~/components/Text';

export interface HeaderProps {
  text: string;
}

export default (props: HeaderProps) => {
  return (
    <Center>
      <Heading1>{props.text}</Heading1>
    </Center>
  );
};