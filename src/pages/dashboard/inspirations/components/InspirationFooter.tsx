import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { CommentsSummary } from '~/pages/dashboard/inspirations/components/CommentsSummary';

export interface InspirationFooterProps {
  // upvotes: number;
  // downvotes: number;
  comments: number;
  className?: string;
}

const InspirationFooterBase = (props: InspirationFooterProps) => {
  const { comments, className } = props;
  return (
    <FlexBox className={className}>
      {/*<Rating {...{ upvotes, downvotes }} />*/}
      <CommentsSummary {...{ comments }} />
    </FlexBox>
  );
};

export const InspirationFooter = styled(InspirationFooterBase)``;
