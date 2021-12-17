import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { PostAnswerDto } from '~/api-client';
import { InspirationHeader } from '~/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';
interface DiscussionItemProps {
  comment: PostAnswerDto;
  className?: string;
}

const DiscussionItemBase = (props: DiscussionItemProps) => {
  return (
    <FlexBox className={props.className}>
      <InspirationHeader
        date={props.comment.date ? parseISO(props.comment.date) : new Date()}
        authorInfo={props.comment.author}
      />
      {<p>{props.comment.text ?? ''}</p>}
    </FlexBox>
  );
};

export const DiscussionItem = styled(DiscussionItemBase)`
  flex-direction: column;
  p {
    margin: 0 ${({ theme }) => theme.spacing.s};
  }
`;
