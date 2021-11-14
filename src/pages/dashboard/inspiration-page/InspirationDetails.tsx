import styled from 'styled-components';
import { Card, FlexBox } from '~/components/Box';
import React from 'react';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';
import { AuthorInfoComponent } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import { AiOutlineClose } from 'react-icons/ai';
import { InspirationContent } from '~/pages/dashboard/inspiration-page/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspiration-page/components/InspirationDiscussion';

interface InspirationDetailsProps {
  inspiration: InspirationModel;
  onClose: () => void;
  className?: string;
}

const InspirationDetailsBase = (props: InspirationDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inspiration, onClose, className } = props;
  return (
    <Card className={props.className}>
      <FlexBox className={'inspiration-details__pre-header'}>
        <span>11/11/2021 12:45 TODO proper date</span>
        <AiOutlineClose className={'inspiration-details--close-icon'} size={25} onClick={onClose} />
      </FlexBox>
      <AuthorInfoComponent authorInfo={inspiration.author} />
      <InspirationContent inspiration={props.inspiration} />
      <InspirationDiscussion comments={props.inspiration.comments} />
    </Card>
  );
};

export const InspirationDetails = styled(InspirationDetailsBase)`
  min-height: 95vh;
  flex-direction: column;
  position: sticky;
  top: 0;

  width: 100%;
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

  .inspiration-details--close-icon {
    margin-right: 10px;
  }
`;
