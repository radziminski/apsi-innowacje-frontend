import styled from 'styled-components';
import { Card, FlexBox } from '~/components/Box';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useDevice from '~/hooks/useDevice';
import { Link, useLocation } from 'react-router-dom';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';
import { useInspirationFromLocation } from './hooks/useInspirationFromLocation';
import LoadingOverlay from '~/components/LoadingOverlay';
import { AuthorInfoComponent } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import { InspirationContent } from '~/pages/dashboard/inspiration-page/components/InspirationContent';
import { InspirationDiscussion } from '~/pages/dashboard/inspiration-page/components/InspirationDiscussion';
import { getInspirationsPagePath } from '~/constants/paths';

export type InspirationDetailsLocationState = { inspiration: InspirationModel };

const InspirationDetailsPageBase = (props: { className?: string }) => {
  const location = useLocation<InspirationDetailsLocationState>();
  const [isLoading, inspiration] = useInspirationFromLocation(location);
  const { isTab } = useDevice();

  return (
    <FlexBox>
      {isLoading ? (
        <LoadingOverlay />
      ) : inspiration ? (
        <Card className={props.className}>
          <FlexBox className={'inspiration-details__pre-header'}>
            <span>11/11/2021 12:45 TODO proper date</span>
            <Link to={getInspirationsPagePath()}>
              <AiOutlineClose size={isTab ? 35 : 25} />
            </Link>
          </FlexBox>
          <AuthorInfoComponent authorInfo={inspiration.author} />
          <InspirationContent inspiration={inspiration} />
          <InspirationDiscussion comments={inspiration.comments} />
        </Card>
      ) : (
        <div>Inspiration not found</div>
      )}
    </FlexBox>
  );
};

export const InspirationDetailsPage = styled(InspirationDetailsPageBase)`
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
`;
