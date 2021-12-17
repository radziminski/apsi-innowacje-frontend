import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Card, FlexBox } from '~/components/Box';
import { InspirationTitle } from '~/pages/dashboard/inspirations/components/InspirationTitle';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspirations/components/InspirationDiscussion';
import { InspirationDetailsProps } from '~/pages/dashboard/inspirations/InspirationDetails';
import useDevice from '~/hooks/useDevice';
import { InspirationHeader } from '~/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';

const InspirationDetailsContentBase = (props: Omit<InspirationDetailsProps, 'isOpened'>) => {
  const { isTab } = useDevice();
  const { inspiration, onClose, className } = props;

  return (
    <Card className={className}>
      <FlexBox className={'inspiration-details__pre-header'}>
        <InspirationHeader
          authorInfo={props.inspiration.author}
          date={props.inspiration.date ? parseISO(props.inspiration.date) : new Date()}
        />
        <AiOutlineClose size={isTab ? 35 : 25} onClick={onClose} />
      </FlexBox>
      <InspirationTitle title={props.inspiration.title} />
      <InspirationContent inspiration={inspiration} />
      <InspirationDiscussion inspiration={inspiration} />
    </Card>
  );
};

export const InspirationDetailsContent = styled(InspirationDetailsContentBase)`
  width: 100%;
  flex-direction: column;

  .inspiration-details__pre-header {
    justify-content: space-between;
    svg {
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
