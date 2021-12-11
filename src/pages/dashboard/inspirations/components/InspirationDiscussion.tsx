import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { CommentModel } from '~/pages/dashboard/inspirations/InspirationsPage';
import { HorizontalRuler } from '~/components/HorizontalRuler';
import { DiscussionItem } from '~/pages/dashboard/inspirations/components/DiscussionItem';

interface InspirationDiscussionProps {
  comments: CommentModel[];
  className?: string;
}

const InspirationDiscussionBase = (props: InspirationDiscussionProps) => {
  return (
    <FlexBox className={props.className}>
      <HorizontalRuler />
      <span>Dyskusja:</span>
      <FlexBox className={'inspiration-details__discussion-list'}>
        {props.comments.map((comment, index) => (
          <div key={comment.id}>
            <DiscussionItem comment={comment} />
            {props.comments.length !== index + 1 && <HorizontalRuler />}
          </div>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export const InspirationDiscussion = styled(InspirationDiscussionBase)`
  flex-direction: column;
  span {
    font-weight: 400;
  }

  .inspiration-details__discussion-list {
    margin: ${({ theme }) => theme.spacing.s} 0 0 ${({ theme }) => theme.spacing.s};
    flex-direction: column;
  }
`;
