import styled from 'styled-components';
import React from 'react';
import { FlexBox } from '~/components/Box';
import { Heading4 } from '~/components/Text';

interface InspirationTitleProps {
  title?: string | null;
  className?: string;
}

const TitleBase = (props: InspirationTitleProps) => {
  return (
    <FlexBox className={props.className}>
      <Heading4 fontSize="1.35rem" fontWeight={500}>
        {props.title ?? 'Nieznany tytuł'}
      </Heading4>
    </FlexBox>
  );
};

export const InspirationTitle = styled(TitleBase)`
  align-items: center;
  span {
    margin-left: ${({ theme }) => theme.spacing.s};
    font-weight: 500;
  }
`;
