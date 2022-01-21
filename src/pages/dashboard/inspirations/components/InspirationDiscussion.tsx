import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { HorizontalRuler } from '~/components/HorizontalRuler';
import { DiscussionItem } from '~/pages/dashboard/inspirations/components/DiscussionItem';
import { CreateComment } from '~/pages/dashboard/inspirations/components/CreateComment';
import { PostDto } from '~/api-client';
import Text from '~/components/Text';

interface InspirationDiscussionProps {
  inspiration: PostDto;
  className?: string;
}

const InspirationDiscussionBase = (props: InspirationDiscussionProps) => {
  return (
    <FlexBox className={props.className}>
      <HorizontalRuler />
      <br />
      <Text>Dyskusja:</Text>
      {props.inspiration.id && (
        <>
          <CreateComment inspirationId={props.inspiration.id} />
          <HorizontalRuler />
        </>
      )}
      <FlexBox className={'inspiration-details__discussion-list'}>
        {props.inspiration.postAnswers &&
          props.inspiration.postAnswers.map((comment, index) => (
            <div key={comment.id}>
              <DiscussionItem comment={comment} />
              {props.inspiration.postAnswers?.length !== index + 1 && (
                <HorizontalRuler className={'discussion__horizontal_ruler'} />
              )}
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
  .discussion__horizontal_ruler {
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
`;
