import styled from 'styled-components';
import { Heading6 } from '~/components/Text';
import formatDate from 'date-fns/format';
import { FlexBox } from '~/components/Box';
import React from 'react';
import { UserDto } from '~/api-client';

export interface InspirationHeaderProps {
  date: Date;
  authorInfo?: UserDto;
  className?: string;
  deleteComponent: JSX.Element;
  canBeDeleted: boolean;
}

export const InspirationHeader = styled((props: InspirationHeaderProps) => {
  const date = props.date;

  return (
    <FlexBox className={props.className}>
      <FlexBox>
        <Heading6 fontWeight={400}>
          {props.authorInfo && `${props.authorInfo.firstName + ' ' + props.authorInfo.lastName}`} |{' '}
          {formatDate(date, 'yyyy-MM-dd')} o {formatDate(date, 'HH:mm')}
        </Heading6>
      </FlexBox>
      {props.canBeDeleted && props.deleteComponent}
    </FlexBox>
  );
})`
  padding-bottom: ${({ theme }) => theme.spacing.s};
  justify-content: space-between;
`;

export const CommentHeader = InspirationHeader;
