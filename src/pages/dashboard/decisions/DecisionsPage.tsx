import React from 'react';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import Box, { Card, FlexBox } from '~/components/Box';
import useDevice from '~/hooks/useDevice';
import { DesktopDecisionsGrid } from '~/pages/dashboard/decisions/grids/DesktopDecisionsGrid';
import { MobileDecisionsGrid } from '~/pages/dashboard/decisions/grids/MobileDecisionsGrid';
import { customSelectStyles, SelectOption } from '~/components/forms';
import AsyncSelect from 'react-select/async';
import apiClient, { DecisionDtoIdeaStatusEnum, SubjectDto } from '~/api-client';
import { subjectDTOAudienceToSelectText } from '~/utils/utils';
import { CustomSubjectSelectOption } from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { useSelector } from '~/store/hooks';
import { IdeaDto } from '~/api-client/java/api';
import { useDispatch } from 'react-redux';
import { getIdeasBySubject, makeDecisionOnIdeaAndGet } from '~/store/slices/CreateDecisionsIdeasSlice';
import { CenteredLoader } from '~/components/Loader';
import { IdeaDetailsModal } from '~/pages/dashboard/decisions/components/IdeaDetailsModal';
import ConfirmModal from '~/components/ConfirmModal';
import { useDecisionsHandlers } from '~/pages/dashboard/decisions/hooks/useDecisionsHandlers';

const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
  return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export interface DecisionsGridCommonProps {
  ideas: IdeaDto[];
  maxCommitteeScore: number;
  onIdeaClick: (idea: IdeaDto) => void;
  onAccept: (idea: IdeaDto) => void;
  onDecline: (idea: IdeaDto) => void;
  onPutAway: (idea: IdeaDto) => void;
  onRequestForDetails: (idea: IdeaDto) => void;
  className?: string;
}

export const DecisionsPage = styled((props: { className?: string }) => {
  const { isTab, isWideTab, isAdditionalBreakpointForDecisionsGrid } = useDevice();
  const [selectedSubject, setSelectedSubject] = React.useState<SelectOption | null>(null);
  const [ideas, setIdeas] = React.useState<IdeaDto[] | null>(null);
  const [maxVotes, setMaxVotes] = React.useState<number | null>(null);
  const [committeeMembers, setCommitteeMembers] = React.useState<number[] | null>(null);

  const [ideaDetails, setIdeaDetails] = React.useState<IdeaDto | null>(null);
  const [ideaDetailsModalVisible, setIdeaDetailsModalVisible] = React.useState<boolean>(false);

  const {
    handlers: [onAccept, onDecline, onPutAway, onRequestForDetails, closeIdeaActionModal],
    states: [currentAction, actionIdea, confirmIdeaActionModalVisible]
  } = useDecisionsHandlers();

  const { ideasBySubject, maxVotesBySubject, committeeMembersBySubject, isLoading } = useSelector(
    state => state.decisionsIdeas
  );
  const dispath = useDispatch();
  const fetchSubjects = React.useCallback(async (inputValue: string) => {
    const fetchedSubjects: SubjectDto[] = (await apiClient.getAllSubjectsUsingGET()).data;

    const fetchedOptions = fetchedSubjects.map(subject => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: `${subject.id!}`,
      label: subject.name ?? 'Nieznany',
      details: subjectDTOAudienceToSelectText(subject.audience)
    }));
    return new Promise(resolve => resolve(getFilteredOptions(fetchedOptions, inputValue)));
  }, []);

  const onSelectSubject = React.useCallback(
    (option: SelectOption | null) => {
      setSelectedSubject(option);
    },
    [ideasBySubject]
  );

  React.useEffect(() => {
    if (selectedSubject === null) {
      setIdeas(null);
    } else {
      const currentSubjectIdeas = ideasBySubject[parseInt(selectedSubject.value)];
      const currentMaxVotes = maxVotesBySubject[parseInt(selectedSubject.value)];
      const currentCommitteeMembers = committeeMembersBySubject[parseInt(selectedSubject.value)];
      if (currentSubjectIdeas && currentMaxVotes && currentCommitteeMembers) {
        setIdeas(currentSubjectIdeas);
        setMaxVotes(currentMaxVotes);
        setCommitteeMembers(currentCommitteeMembers);
      } else {
        dispath(getIdeasBySubject(parseInt(selectedSubject.value)));
        setIdeas(null);
        setMaxVotes(null);
        setCommitteeMembers(null);
      }
    }
  }, [ideasBySubject, selectedSubject]);

  const onIdeaClick = React.useCallback((idea: IdeaDto) => {
    setIdeaDetails(idea);
    setIdeaDetailsModalVisible(true);
  }, []);

  const onIdeaDetailsModalClose = () => {
    setIdeaDetailsModalVisible(false);
    setTimeout(() => setIdeaDetails(null), 500);
  };

  const onIdeaActionModalConfirm = React.useCallback(() => {
    if (actionIdea && actionIdea.id && currentAction && selectedSubject) {
      dispath(
        makeDecisionOnIdeaAndGet({
          ideaId: actionIdea.id,
          subjectId: parseInt(selectedSubject.value),
          decision: currentAction
        })
      );
    }
    closeIdeaActionModal();
  }, [actionIdea, selectedSubject]);

  const onIdeaActionModalClose = () => {
    closeIdeaActionModal();
  };

  return (
    <DashboardContent
      title="Podejmowanie decyzji"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu możesz akceptować bądź odrzucać pomysły ocenione przez komisję.'}>
      <div className={props.className}>
        {<IdeaDetailsModal isVisible={ideaDetailsModalVisible} idea={ideaDetails} onClose={onIdeaDetailsModalClose} />}
        {
          <ConfirmModal
            title={`Czy na pewno chcesz ${
              currentAction
                ? currentAction.ideaStatus === DecisionDtoIdeaStatusEnum.Accepted
                  ? 'zaakceptować'
                  : currentAction.ideaStatus === DecisionDtoIdeaStatusEnum.Rejected
                  ? 'odrzucić'
                  : currentAction.ideaStatus === DecisionDtoIdeaStatusEnum.PutAway
                  ? 'odłożyć'
                  : 'przekazać do uzupełnienia'
                : 'przetworzyć' //just for TS, because he cares about currentAction being maybe null
            } pomysł ${actionIdea?.title ? `„${actionIdea?.title}"` : ' o nieznanym tytule'}?`}
            isVisible={confirmIdeaActionModalVisible}
            onConfirm={onIdeaActionModalConfirm}
            onClose={onIdeaActionModalClose}
          />
        }
        <FlexBox className="select-category">
          <span>Wybierz kategorię pomysłów: </span>
          <Box width={'300px'}>
            <AsyncSelect
              loadOptions={fetchSubjects}
              cacheOptions
              defaultOptions
              styles={customSelectStyles(false)}
              noOptionsMessage={() => 'Brak kategorii'}
              loadingMessage={() => 'Ładowanie kategorii...'}
              components={{ Option: CustomSubjectSelectOption }}
              onChange={onSelectSubject}
              placeholder={'Wybierz...'}
            />
          </Box>
        </FlexBox>
        <Box paddingBottom={'1rem'} />
        {selectedSubject && <Paragraph fontWeight={500}>{`Pomysły w kategorii "${selectedSubject.label}":`}</Paragraph>}
        {ideas && maxVotes && committeeMembers ? (
          <Card>
            {(isWideTab && !isTab) || isAdditionalBreakpointForDecisionsGrid ? (
              <MobileDecisionsGrid
                ideas={ideas}
                maxCommitteeScore={maxVotes * committeeMembers.length}
                onIdeaClick={onIdeaClick}
                onAccept={onAccept}
                onDecline={onDecline}
                onPutAway={onPutAway}
                onRequestForDetails={onRequestForDetails}
              />
            ) : (
              <DesktopDecisionsGrid
                ideas={ideas}
                maxCommitteeScore={maxVotes * committeeMembers.length}
                onIdeaClick={onIdeaClick}
                onAccept={onAccept}
                onDecline={onDecline}
                onPutAway={onPutAway}
                onRequestForDetails={onRequestForDetails}
              />
            )}
          </Card>
        ) : isLoading ? (
          <CenteredLoader />
        ) : null}
      </div>
    </DashboardContent>
  );
})`
  .select-category {
    align-items: center;
    width: 600px;
    max-width: 100%;
    justify-content: flex-start;
    span {
      margin-right: 0.5rem;
    }
  }
`;