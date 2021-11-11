import React, { ForwardedRef } from 'react';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import { InspirationContent } from '~/pages/dashboard/inspiration-page/components/InspirationContent';

interface InspirationProps {
  inspiration: InspirationModel;
  className?: string;
}

const InspirationBase = React.forwardRef((props: InspirationProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <FlexBox className={props.className} ref={ref}>
      <AuthorInfo authorInfo={props.inspiration.author} />
      <InspirationContent inspiration={props.inspiration} />
    </FlexBox>
  );
});

export const Inspiration = styled(InspirationBase)`
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.margins.small};
  padding: ${({ theme }) => theme.margins.small};
  flex-direction: column;
  // > div {
  //   margin:
  // }
`;
