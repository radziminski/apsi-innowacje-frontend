import React from 'react';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import Box, { Card, FlexBox } from '~/components/Box';
import useDevice from '~/hooks/useDevice';
import { DesktopDecisionsGrid } from '~/pages/dashboard/decisions/grids/DesktopDecisionsGrid';
import { MobileDecisionsGrid } from '~/pages/dashboard/decisions/grids/MobileDecisionsGrid';
import { customSelectStyles, SelectOption } from '~/components/forms';
import AsyncSelect from 'react-select/async';
import apiClient, { SubjectDto } from '~/api-client';
import { subjectDTOAudienceToSelectText } from '~/utils/utils';
import { CustomSubjectSelectOption } from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { useSelector } from '~/store/hooks';
import { IdeaDto } from '~/api-client/java/api';
import { useDispatch } from 'react-redux';
import { getIdeasBySubject } from '~/store/slices/CreateDecisionsIdeasSlice';
import { CenteredLoader } from '~/components/Loader';
import { IdeaDetailsModal } from '~/pages/dashboard/decisions/components/IdeaDetailsModal';

const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
  return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export interface DecisionsGridCommonProps {
  ideas: IdeaDto[];
  maxCommitteeScore: number;
  onIdeaClick: (idea: IdeaDto) => void;
  onAccept: (idea: IdeaDto) => void;
  onDecline: (idea: IdeaDto) => void;
  className?: string;
}

export const DecisionsPage = styled((props: { className?: string }) => {
  const { isTab, isWideTab, isMobile } = useDevice();
  const [selectedSubject, setSelectedSubject] = React.useState<SelectOption | null>(null);
  const [ideas, setIdeas] = React.useState<IdeaDto[] | null>(null);
  const [maxVotes, setMaxVotes] = React.useState<number | null>(null);
  const [committeeMembers, setCommitteeMembers] = React.useState<number[] | null>(null);
  const [ideaModalDetails, setIdeaModalDetails] = React.useState<IdeaDto | null>(null);
  const [ideaModalVisible, setIdeaModalVisible] = React.useState<boolean>(false);
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
    setIdeaModalDetails(idea);
    setIdeaModalVisible(true);
  }, []);

  const onIdeaDetailsModalClose = () => {
    setIdeaModalVisible(false);
    setTimeout(() => setIdeaModalDetails(null), 500);
  };

  const onAccept = React.useCallback(() => {
    return;
  }, []);

  const onDecline = React.useCallback(() => {
    return;
  }, []);

  return (
    <DashboardContent
      title="Podejmowanie decyzji"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu możesz akceptować bądź odrzucać pomysły ocenione przez komisję.'}>
      <div className={props.className}>
        {<IdeaDetailsModal isVisible={ideaModalVisible} idea={ideaModalDetails} onClose={onIdeaDetailsModalClose} />}
        <FlexBox className="select-category">
          <span>Wybierz kategorię pomysłów: </span>
          <Box width={'300px'}>
            <AsyncSelect
              loadOptions={fetchSubjects}
              cacheOptions
              defaultOptions
              styles={customSelectStyles(false)}
              noOptionsMessage={() => 'Brak kategorii'}
              loadingMessage={() => 'Ładowanie kategoriinpm...'}
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
            {(isWideTab && !isTab) || isMobile ? (
              <MobileDecisionsGrid
                ideas={ideas}
                maxCommitteeScore={maxVotes * committeeMembers.length}
                onIdeaClick={onIdeaClick}
                onAccept={onAccept}
                onDecline={onDecline}
              />
            ) : (
              <DesktopDecisionsGrid
                ideas={ideas}
                maxCommitteeScore={maxVotes * committeeMembers.length}
                onIdeaClick={onIdeaClick}
                onAccept={onAccept}
                onDecline={onDecline}
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
