import styled from 'styled-components';
import React from 'react';
import { ProfilePicture } from '~/pages/dashboard/inspirations/components/ProfilePicture';
import { FlexBox } from '~/components/Box';

export interface AuthorInfo {
  firstName: string;
  lastName: string;
}

interface AuthorInfoProps {
  authorInfo: AuthorInfo;
  className?: string;
}

const AuthorInfoBase = (props: AuthorInfoProps) => {
  return (
    <FlexBox className={props.className}>
      <ProfilePicture />
      <span>{props.authorInfo.firstName + ' ' + props.authorInfo.lastName}</span>
    </FlexBox>
  );
};

export const AuthorInfoComponent = styled(AuthorInfoBase)`
  align-items: center;
  span {
    margin-left: ${({ theme }) => theme.spacing.s};
    font-weight: 500;
  }
`;
