import React from 'react';
import styled from 'styled-components';
import { PostDto } from '~/api-client';

interface InspirationContentProps {
  inspiration: PostDto;
  className?: string;
}

const InspirationContentBase = (props: InspirationContentProps) => {
  return (
    <div className={props.className}>
      {props.inspiration.text && (
        <div
          className={'inspiration-content__text-content'}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          dangerouslySetInnerHTML={{ __html: props.inspiration.text! }}
        />
      )}
      {/*<div className={'inspiration-content__images'}>{props.inspiration.images}</div>*/}
    </div>
  );
};

export const InspirationContent = styled(InspirationContentBase)`
  margin: ${({ theme }) => theme.spacing.s};
  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;
