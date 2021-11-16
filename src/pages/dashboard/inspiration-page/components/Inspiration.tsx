import React, { ForwardedRef } from 'react';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';
import styled from 'styled-components';
import { Card } from '~/components/Box';
import { AuthorInfoComponent } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import { InspirationContent } from '~/pages/dashboard/inspiration-page/components/InspirationContent';
import { InspirationFooter } from '~/pages/dashboard/inspiration-page/components/InspirationFooter';

interface InspirationProps {
  inspiration: InspirationModel;
  onClick: () => void;
  customClassName?: string;
  className?: string;
}

const InspirationBase = React.forwardRef((props: InspirationProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Card className={`${props.className} ${props.customClassName || ''}`} ref={ref} onClick={props.onClick}>
      <AuthorInfoComponent authorInfo={props.inspiration.author} />
      <InspirationContent inspiration={props.inspiration} />
      <InspirationFooter
        // upvotes={props.inspiration.upvotes}
        // downvotes={props.inspiration.downvotes}
        comments={props.inspiration.comments.length}
      />
    </Card>
  );
});

export const Inspiration = styled(InspirationBase)`
  cursor: pointer;
  flex-direction: column;
`;
