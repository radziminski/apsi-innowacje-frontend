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
      <div className={'inspiration-content__text-content'}>{props.inspiration.text}</div>
      {/*<div className={'inspiration-content__images'}>{props.inspiration.images}</div>*/}
    </div>
  );
};

export const InspirationContent = styled(InspirationContentBase)`
  margin: ${({ theme }) => theme.spacing.s};
`;
