import React from 'react';
import { IdeaDto } from '~/api-client';
import { DecisionsGridCommonProps } from '~/pages/dashboard/decisions/DecisionsPage';

export const useIdeasGrid = (
  props: Pick<DecisionsGridCommonProps, 'onAccept' | 'onDecline' | 'onIdeaClick'>
): ((idea: IdeaDto) => void)[] => {
  const onClickAccept = React.useCallback(
    (idea: IdeaDto) => {
      props.onAccept(idea);
    },
    [props.onAccept]
  );

  const onClickDecline = React.useCallback(
    (idea: IdeaDto) => {
      props.onDecline(idea);
    },
    [props.onDecline]
  );

  const onRowClick = React.useCallback(
    (idea: IdeaDto) => {
      props.onIdeaClick(idea);
    },
    [props.onIdeaClick]
  );

  return [onClickAccept, onClickDecline, onRowClick];
};
