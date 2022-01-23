import styled from 'styled-components';
import { Heading6 } from '~/components/Text';
import formatDate from 'date-fns/format';
import { FlexBox } from '~/components/Box';
import React from 'react';
import { UserDto } from '~/api-client';
import { useSelector } from '~/store/hooks';

export interface InspirationHeaderProps {
  date: Date;
  authorInfo?: UserDto;
  className?: string;
  deleteComponent: JSX.Element;
}

export const InspirationHeader = styled((props: InspirationHeaderProps) => {
  const date = props.date;
  const { currentUser } = useSelector(state => state.user);
  const canBeDeleted = props.authorInfo?.id == currentUser?.id;

  return (
    <FlexBox className={props.className}>
      <FlexBox>
        <Heading6 fontWeight={400}>
          {props.authorInfo && `${props.authorInfo.firstName + ' ' + props.authorInfo.lastName}`} |{' '}
          {formatDate(date, 'yyyy-MM-dd')} o {formatDate(date, 'HH:mm')}
        </Heading6>
      </FlexBox>
      {canBeDeleted && props.deleteComponent}
    </FlexBox>
  );
})`
  padding-bottom: ${({ theme }) => theme.spacing.s};
  justify-content: space-between;
`;
