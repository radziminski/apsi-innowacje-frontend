import React from 'react';
import { IdeaDto } from '~/api-client';
import { DecisionsGridCommonProps } from '~/pages/dashboard/decisions/DecisionsPage';

export const useIdeasDecisionsGrid = (
  props: Pick<DecisionsGridCommonProps, 'onAccept' | 'onDecline' | 'onRequestForDetails' | 'onPutAway'>
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

  const onClickPutAway = React.useCallback(
    (idea: IdeaDto) => {
      props.onPutAway(idea);
    },
    [props.onPutAway]
  );

  const onClickRequestForDetails = React.useCallback(
    (idea: IdeaDto) => {
      props.onRequestForDetails(idea);
    },
    [props.onRequestForDetails]
  );

  return [onClickAccept, onClickDecline, onClickPutAway, onClickRequestForDetails];
};
