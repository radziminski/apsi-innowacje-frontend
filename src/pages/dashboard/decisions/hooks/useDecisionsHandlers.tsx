import { DecisionDto, DecisionDtoIdeaStatusEnum, IdeaDto } from '~/api-client';
import React from 'react';

export const useDecisionsHandlers = (): {
  handlers: [
    (idea: IdeaDto) => void,
    (idea: IdeaDto) => void,
    (idea: IdeaDto) => void,
    (idea: IdeaDto) => void,
    () => void
  ];
  states: [DecisionDto | null, IdeaDto | null, boolean];
} => {
  const [currentAction, setCurrentAction] = React.useState<DecisionDto | null>(null);
  const [confirmIdeaActionModalVisible, setConfirmIdeaActionModalVisible] = React.useState<boolean>(false);
  const [actionIdea, setActionIdea] = React.useState<IdeaDto | null>(null);

  const onAccept = (idea: IdeaDto) => {
    setActionIdea(idea);
    setCurrentAction({
      ideaStatus: DecisionDtoIdeaStatusEnum.Accepted,
      description: 'Zaakceptowany'
    });
    setConfirmIdeaActionModalVisible(true);
  };

  const onDecline = (idea: IdeaDto) => {
    setActionIdea(idea);
    setCurrentAction({
      ideaStatus: DecisionDtoIdeaStatusEnum.Rejected,
      description: 'Odrzucony'
    });
    setConfirmIdeaActionModalVisible(true);
  };

  const onPutAway = (idea: IdeaDto) => {
    setActionIdea(idea);
    setCurrentAction({
      ideaStatus: DecisionDtoIdeaStatusEnum.PutAway,
      description: 'Odłożony'
    });
    setConfirmIdeaActionModalVisible(true);
  };

  const onRequestForDetails = (idea: IdeaDto) => {
    setActionIdea(idea);
    setCurrentAction({
      ideaStatus: DecisionDtoIdeaStatusEnum.ReuqestForDetails,
      description: 'Przekazany do uzupełnienia'
    });
    setConfirmIdeaActionModalVisible(true);
  };

  const closeIdeaActionModal = () => {
    setConfirmIdeaActionModalVisible(false);
    setTimeout(() => setCurrentAction(null), 500);
    setTimeout(() => setActionIdea(null), 500);
  };

  return {
    handlers: [onAccept, onDecline, onPutAway, onRequestForDetails, closeIdeaActionModal],
    states: [currentAction, actionIdea, confirmIdeaActionModalVisible]
  };
};
