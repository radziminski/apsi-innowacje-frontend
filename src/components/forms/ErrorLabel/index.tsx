import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';

export const ErrorLabel = styled((props: { text: string; className?: string }) => {
  return <Paragraph className={props.className}>{props.text}</Paragraph>;
})`
  margin-top: 5px;
  font-size: 0.9rem;
`;
