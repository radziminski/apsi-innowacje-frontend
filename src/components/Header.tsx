import React from 'react';
import { FlexBox } from '~/components/Box';
import { Heading1 } from '~/components/Text';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';

export interface HeaderProps {
  text: string;
  className?: string;
}

const HeaderBase = (props: HeaderProps) => {
  return (
    <FlexBox className={props.className}>
      <Heading1>{props.text}</Heading1>
    </FlexBox>
  );
};

export const Header = styled(HeaderBase)`
  margin: ${MARGINS.small} 0;
`;
