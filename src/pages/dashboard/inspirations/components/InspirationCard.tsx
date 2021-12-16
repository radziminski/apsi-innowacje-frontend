import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Card } from '~/components/Box';
import { InspirationTitle } from '~/pages/dashboard/inspirations/components/InspirationTitle';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationFooter } from '~/pages/dashboard/inspirations/components/InspirationFooter';
import { PostDto } from '~/api-client';
import { InspirationHeader } from '~/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';
import classNames from 'classnames';

interface InspirationProps {
  inspiration: PostDto;
  onClick: () => void;
  customClassName?: string;
  className?: string;
}

const InspirationBase = React.forwardRef((props: InspirationProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Card className={classNames(props.className, props.customClassName)} ref={ref} onClick={props.onClick}>
      <InspirationHeader
        authorInfo={props.inspiration.author}
        date={props.inspiration.date ? parseISO(props.inspiration.date) : new Date()}
      />
      <InspirationTitle title={props.inspiration.title} />
      <InspirationContent inspiration={props.inspiration} />
      <InspirationFooter
        // upvotes={props.inspiration.upvotes}
        // downvotes={props.inspiration.downvotes}
        comments={0}
      />
    </Card>
  );
});

export const InspirationCard = styled(InspirationBase)`
  cursor: pointer;
  flex-direction: column;
`;
