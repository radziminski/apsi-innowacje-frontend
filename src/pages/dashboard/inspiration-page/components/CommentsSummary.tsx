import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { BsFillChatFill } from 'react-icons/bs';
import { COLORS } from '~/styles/variables';
import React from 'react';

interface CommentsSummaryProps {
  comments: number;
  className?: string;
}

const CommentsSummaryBase = (props: CommentsSummaryProps) => {
  return (
    <FlexBox className={props.className}>
      <BsFillChatFill color={COLORS.primary} />
      <span>{props.comments}</span>
    </FlexBox>
  );
};

export const CommentsSummary = styled(CommentsSummaryBase)`
  span {
    margin: 0 5px;
  }
`;
