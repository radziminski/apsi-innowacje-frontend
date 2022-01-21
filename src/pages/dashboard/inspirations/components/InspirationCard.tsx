import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Card } from '~/components/Box';
import { InspirationTitle } from '~/pages/dashboard/inspirations/components/InspirationTitle';
import { InspirationContent } from '~/pages/dashboard/inspirations/components/InspirationContent';
import { InspirationFooter } from '~/pages/dashboard/inspirations/components/InspirationFooter';
import { InspirationHeader } from '~/pages/dashboard/inspirations/components/InspirationHeader';
import parseISO from 'date-fns/parseISO';
import classNames from 'classnames';
import { PostDto } from '~/api-client';

interface InspirationProps {
  inspiration: PostDto;
  onClick: () => void;
  customClassName?: string;
  className?: string;
  deleteComponent: JSX.Element;
}

const InspirationBase = React.forwardRef((props: InspirationProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <Card className={classNames(props.className, props.customClassName)} ref={ref} onClick={props.onClick}>
      <InspirationHeader
        authorInfo={props.inspiration.author}
        date={props.inspiration.date ? parseISO(props.inspiration.date) : new Date()}
        deleteComponent={props.deleteComponent}
      />
      <InspirationTitle title={props.inspiration.title} />
      <InspirationContent inspiration={props.inspiration} />
      <InspirationFooter comments={props.inspiration.postAnswers ? props.inspiration.postAnswers.length : 0} />
    </Card>
  );
});

export const InspirationCard = styled(InspirationBase)`
  cursor: pointer;
  flex-direction: column;
`;
