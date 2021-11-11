import React, { ForwardedRef } from 'react';
import { InspirationModel } from '~/pages/dashboard/inspiration-page/InspirationPage';

interface InspirationProps {
  inspiration: InspirationModel;
}

export const Inspiration = React.forwardRef((props: InspirationProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <div ref={ref}>{props.inspiration.title}</div>;
});
