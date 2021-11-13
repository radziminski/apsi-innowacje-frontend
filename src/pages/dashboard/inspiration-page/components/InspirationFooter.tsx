import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import React from 'react';
import { Rating } from '~/pages/dashboard/inspiration-page/components/Rating';
import { CommentsSummary } from '~/pages/dashboard/inspiration-page/components/CommentsSummary';

export interface InspirationFooterProps {
  upvotes: number;
  downvotes: number;
  comments: number;
  className?: string;
}

const InspirationFooterBase = (props: InspirationFooterProps) => {
  const { upvotes, downvotes, comments, className } = props;
  return (
    <FlexBox className={className}>
      <Rating {...{ upvotes, downvotes }} />
      <CommentsSummary {...{ comments }} />
    </FlexBox>
  );
};

export const InspirationFooter = styled(InspirationFooterBase)``;
