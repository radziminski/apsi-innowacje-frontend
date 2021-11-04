import React from 'react';
import { Center } from '~/components/Box';
import { Heading1 } from '~/components/Text';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';

export interface HeaderProps {
  text: string;
  className?: string;
}

const HeaderBase = (props: HeaderProps) => {
  return (
    <Center className={props.className}>
      <Heading1>{props.text}</Heading1>
    </Center>
  );
};

export const Header = styled(HeaderBase)`
  margin: ${MARGINS.small} 0;
`;
