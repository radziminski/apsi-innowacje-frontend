import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from 'react-icons/bs';
import { COLORS } from '~/styles/variables';

interface RatingProps {
  upvotes: number;
  downvotes: number;
  className?: string;
}

const RatingBase = (props: RatingProps) => {
  return (
    <FlexBox className={props.className}>
      <BsFillArrowUpSquareFill color={COLORS.accent4} />
      <span>{props.upvotes}</span>
      <BsFillArrowDownSquareFill color={COLORS.error} />
      <span>{props.downvotes}</span>
    </FlexBox>
  );
};

export const Rating = styled(RatingBase)`
  span {
    margin: 0 5px;
  }
`;
