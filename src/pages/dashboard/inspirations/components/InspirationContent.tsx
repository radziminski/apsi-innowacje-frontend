import styled from 'styled-components';
import { InspirationModel } from '~/pages/dashboard/inspirations/InspirationPage';
import React from 'react';

interface InspirationContentProps {
  inspiration: InspirationModel;
  className?: string;
}

const InspirationContentBase = (props: InspirationContentProps) => {
  return (
    <div className={props.className}>
      <div className={'inspiration-content__text-content'}>{props.inspiration.content}</div>
      {/*<div className={'inspiration-content__images'}>{props.inspiration.images}</div>*/}
    </div>
  );
};

export const InspirationContent = styled(InspirationContentBase)`
  margin: ${({ theme }) => theme.margins.small};
`;
