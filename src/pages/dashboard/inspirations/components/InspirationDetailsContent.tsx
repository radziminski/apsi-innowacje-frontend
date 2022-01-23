import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Card, FlexBox } from '~/components/Box';
import { InspirationTitle } from '~/pages/dashboard/inspirations/components/InspirationTitle';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspirations/components/InspirationDiscussion';
import { InspirationDetailsProps } from '~/pages/dashboard/inspirations/InspirationDetails';
import useDevice from '~/hooks/useDevice';
import { InspirationHeader } from '~/pages/dashboard/inspirations/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';
import { useSelector } from '~/store/hooks';

const InspirationDetailsContentBase = (props: Omit<InspirationDetailsProps, 'isOpened'>) => {
  const { isTab } = useDevice();
  const { inspirationId, onClose, className } = props;
  const inspiration = useSelector(state => state.inspirations.inspirations.find(ins => ins.id === inspirationId));

  return (
    <Card className={className}>
      {inspiration && (
        <>
          <FlexBox className={'inspiration-details__pre-header'}>
            <InspirationHeader
              authorInfo={inspiration.author}
              date={inspiration.date ? parseISO(inspiration.date) : new Date()}
              deleteComponent={props.deleteComponent}
            />
            <AiOutlineClose size={isTab ? 35 : 25} onClick={onClose} />
          </FlexBox>
          <InspirationTitle title={inspiration.title} />
          <InspirationContent inspiration={inspiration} />
          <InspirationDiscussion inspiration={inspiration} />
        </>
      )}
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
