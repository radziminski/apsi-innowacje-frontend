import styled from 'styled-components';
import { Card, FlexBox } from '~/components/Box';
import React, { useEffect } from 'react';
import { InspirationModel } from '~/pages/dashboard/inspirations/InspirationPage';
import { AuthorInfoComponent } from '~/pages/dashboard/inspirations/components/AuthorInfo';
import { AiOutlineClose } from 'react-icons/ai';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspirations/components/InspirationDiscussion';
import useDevice from '~/hooks/useDevice';

interface InspirationDetailsProps {
  inspiration: InspirationModel;
  onClose: () => void;
  isOpened?: boolean;
  className?: string;
}

const InspirationDetailsBase = (props: InspirationDetailsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inspiration, onClose, isOpened, className } = props;
  const { isTab } = useDevice();
  useEffect(() => {
    if (isTab) {
      if (isOpened) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'visible';
      }
    }
    return () => {
      document.body.style.overflowY = 'visible';
    };
  }, [isOpened]);
  return (
    <FlexBox className={className}>
      <Card>
        <FlexBox className={'inspiration-details__pre-header'}>
          <span>11/11/2021 12:45 TODO proper date</span>
          <AiOutlineClose size={isTab ? 35 : 25} onClick={onClose} />
        </FlexBox>
        <AuthorInfoComponent authorInfo={inspiration.author} />
        <InspirationContent inspiration={props.inspiration} />
        <InspirationDiscussion comments={props.inspiration.comments} />
      </Card>
    </FlexBox>
  );
};

export const InspirationDetails = styled(InspirationDetailsBase)`
  min-height: 100vh;
  width: 100%;
  top: 0;
  bottom: 0;
  position: fixed;

  > div {
    width: 100%;
    overflow-y: scroll;
    flex-direction: column;
  }
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
