import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { PostAnswerDto } from '~/api-client';
import { CommentHeader } from '~/pages/dashboard/inspirations/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';
import { useSelector } from '~/store/hooks';

interface DiscussionItemProps {
  comment: PostAnswerDto;
  deleteComponent: JSX.Element;
  className?: string;
}

const DiscussionItemBase = (props: DiscussionItemProps) => {
  const { currentUser } = useSelector(state => state.user);
  const canBeDeleted = props.comment.author?.id == currentUser?.id;
  return (
    <FlexBox className={props.className}>
      <CommentHeader
        date={props.comment.date ? parseISO(props.comment.date) : new Date()}
        authorInfo={props.comment.author}
        deleteComponent={props.deleteComponent}
        canBeDeleted={canBeDeleted}
      />
      {<p>{props.comment.text ?? ''}</p>}
    </FlexBox>
  );
};

export const DiscussionItem = styled(DiscussionItemBase)`
  flex-direction: column;
  p {
    margin: 0 ${({ theme }) => theme.spacing.s};
    white-space: pre-line;
  }
`;
