import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Card, FlexBox } from '~/components/Box';
import { AuthorInfoComponent } from '~/pages/dashboard/inspirations/components/AuthorInfo';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspirations/components/InspirationDiscussion';
import { InspirationDetailsProps } from '~/pages/dashboard/inspirations/InspirationDetails';
import useDevice from '~/hooks/useDevice';

const InspirationDetailsContentBase = (props: Omit<InspirationDetailsProps, 'isOpened'>) => {
  const { isTab } = useDevice();
  const { inspiration, onClose, className } = props;

  return (
    <Card className={className}>
      <FlexBox className={'inspiration-details__pre-header'}>
        {/*  TODO proper date*/}
        <span>{new Date().toLocaleDateString() + ' o ' + new Date().toLocaleTimeString()}</span>
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
