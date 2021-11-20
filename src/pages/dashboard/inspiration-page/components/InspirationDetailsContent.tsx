import { Card, FlexBox } from '~/components/Box';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthorInfoComponent } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import { InspirationContent } from '~/pages/dashboard/inspiration-page/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspiration-page/components/InspirationDiscussion';
import React from 'react';
import useDevice from '~/hooks/useDevice';
import styled from 'styled-components';
import { InspirationDetailsProps } from '~/pages/dashboard/inspiration-page/InspirationDetails';

const InspirationDetailsContentBase = (props: Omit<InspirationDetailsProps, 'isOpened'>) => {
  const { isTab } = useDevice();
  const { inspiration, onClose, className } = props;

  return (
    <Card className={className}>
      <FlexBox className={'inspiration-details__pre-header'}>
        <span>11/11/2021 12:45 TODO proper date</span>
        <AiOutlineClose size={isTab ? 35 : 25} onClick={onClose} />
      </FlexBox>
      <AuthorInfoComponent authorInfo={inspiration.author} />
      <InspirationContent inspiration={inspiration} />
      <InspirationDiscussion comments={inspiration.comments} />
    </Card>
  );
};

export const InspirationDetailsContent = styled(InspirationDetailsContentBase)`
  width: 100%;
  flex-direction: column;

  .inspiration-details__pre-header {
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.margins.small};
    svg {
      cursor: pointer;
      transition: 0.15s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
