import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { AuthorInfoComponent } from '~/pages/dashboard/inspirations/components/AuthorInfo';
import { CommentModel } from '~/pages/dashboard/inspirations/InspirationsPage';

interface DiscussionItemProps {
  comment: CommentModel;
  className?: string;
}

const DiscussionItemBase = (props: DiscussionItemProps) => {
  return (
    <FlexBox className={props.className}>
      <AuthorInfoComponent authorInfo={props.comment.author} />
      <p>{props.comment.content}</p>
    </FlexBox>
  );
};

export const DiscussionItem = styled(DiscussionItemBase)`
  flex-direction: column;
  p {
    margin: ${({ theme }) => theme.spacing.s};
  }
`;
