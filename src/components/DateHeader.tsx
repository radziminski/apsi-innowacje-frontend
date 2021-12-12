import styled from 'styled-components';
import { Heading6 } from '~/components/Text';
import formatDate from 'date-fns/format';
import { FlexBox } from '~/components/Box';
import React from 'react';

export const DateHeader = styled((props: { date: Date; className?: string }) => {
  const date = props.date;

  return (
    <FlexBox className={props.className}>
      <Heading6 fontWeight={400}>
        {formatDate(date, 'yyyy-MM-dd')} o {formatDate(date, 'HH:mm')}
      </Heading6>
    </FlexBox>
  );
})`
  padding-bottom: ${({ theme }) => theme.spacing.s};
`;
