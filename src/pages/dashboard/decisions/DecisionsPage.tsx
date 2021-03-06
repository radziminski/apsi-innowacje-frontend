import React from 'react';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import Box, { Card, FlexBox } from '~/components/Box';
import useDevice from '~/hooks/useDevice';
import { DesktopDecisionsGrid } from '~/pages/dashboard/decisions/grids/DesktopDecisionsGrid';
import { MobileDecisionsGrid } from '~/pages/dashboard/decisions/grids/MobileDecisionsGrid';
import { customSelectStyles } from '~/components/forms';
import AsyncSelect from 'react-select/async';
import apiClient, { DecisionDto, SubjectDto, UserDto, UserRole } from '~/api-client';
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
import { toast } from 'react-toastify';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';
import { getAllUsers } from '~/store/slices/CreateUserSlice';

export interface SelectOption {
  label: string;
  value: string | null;
  details?: string;
}

const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
  return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
};

export type IdeaRequiredId = Required<Pick<IdeaDto, 'id'>> & Omit<IdeaDto, 'id'>;

export interface DecisionsGridCommonProps {
  ideas: IdeaDto[];
  isOthersCategory: boolean;
  maxCommitteeScore: number | undefined;
  onIdeaClick: (idea: IdeaDto) => void;
  onDecision: (idea: IdeaRequiredId, decision: DecisionDto) => void;
  className?: string;
}

export const DecisionsPage = styled((props: { className?: string }) => {
  const { isTab, isWideTab, isAdditionalBreakpointForDecisionsGrid } = useDevice();
  const [selectedSubject, setSelectedSubject] = React.useState<SelectOption | null>(null);
  const [ideasToDisplay, setIdeasToDisplay] = React.useState<IdeaDto[] | null>(null);
  const [maxVotes, setMaxVotes] = React.useState<number | null>(null);
  const [committeeMembers, setCommitteeMembers] = React.useState<UserDto[] | null>(null);

  const [ideaDetails, setIdeaDetails] = React.useState<IdeaDto | null>(null);
  const [ideaDetailsModalVisible, setIdeaDetailsModalVisible] = React.useState<boolean>(false);

  const { ideas: allIdeas, isLoading: isLoadingIdeas } = useSelector(state => state.ideas);
  const { ideasBySubject, maxVotesBySubject, committeeMembersBySubject, isLoading } = useSelector(
    state => state.decisionsIdeas
  );
  const { allUsers, isLoadingAllUsers } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const fetchSubjects = React.useCallback(async (inputValue: string) => {
    try {
      const response = await apiClient.getAllSubjectsUsingGET();
      if (response.status === 200) {
        const fetchedSubjects: SubjectDto[] = response.data;

        const fetchedOptions = fetchedSubjects
          .map(subject => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value: `${subject.id!}`,
            label: subject.name ?? 'Nieznany',
            details: subjectDTOAudienceToSelectText(subject.audience)
          }));
        fetchedOptions.push({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: null as any,
          label: 'Inne',
          details: 'Wszyscy'
        });
        return getFilteredOptions(fetchedOptions, inputValue);
      } else {
        toast.error('Wyst??pi?? problem podczas pobierania temat??w.');
        return new Promise(resolve => resolve(null));
      }
    } catch (e) {
      toast.error('Wyst??pi?? problem podczas pobierania temat??w.');
    }
    return new Promise(resolve => resolve(null));
  }, []);

  const onSelectSubject = React.useCallback(
    (option: SelectOption | null) => {
      setSelectedSubject(option);
    },
    [ideasBySubject]
  );

  React.useEffect(() => {
    if (!allIdeas && !isLoadingIdeas) {
      dispatch(getIdeas());
    }
    if (!allUsers && !isLoadingAllUsers) {
      dispatch(getAllUsers());
    }
  }, []);

  React.useEffect(() => {
    if (selectedSubject === null) {
      setIdeasToDisplay(null);
    } else if (allIdeas !== null) {
      const subjectKey = selectedSubject.value === null ? 'others' : parseInt(selectedSubject.value);
      const currentSubjectIdeas = ideasBySubject[subjectKey];
      const currentMaxVotes = maxVotesBySubject[subjectKey];
      const currentCommitteeMembers = committeeMembersBySubject[subjectKey];
      if (currentSubjectIdeas !== undefined) {
        // (selectedSubject.value === null || (currentMaxVotes && currentCommitteeMembers)
        setIdeasToDisplay(
          [...currentSubjectIdeas]
            .filter(idea => !idea.blocked)
            .sort((left, right) =>
              right.votesSum === undefined ? -1 : left.votesSum === undefined ? 1 : right.votesSum - left.votesSum
            )
        );
        if (selectedSubject.value === null) {
          setCommitteeMembers(allUsers ? allUsers.filter(user => user.userRole === UserRole.Committee) : null);
          setMaxVotes(null);
        } else {
          setMaxVotes(currentMaxVotes);
          setCommitteeMembers(currentCommitteeMembers);
        }
      } else {
        dispatch(
          getIdeasBySubject({
            subjectId: selectedSubject.value === null ? selectedSubject.value : parseInt(selectedSubject.value),
            ideas: allIdeas
          })
        );
        setIdeasToDisplay(null);
        setMaxVotes(null);
        setCommitteeMembers(null);
      }
    } else if (!isLoadingIdeas) {
      dispatch(getIdeas());
    }
  }, [allIdeas, allUsers, isLoadingIdeas, ideasBySubject, selectedSubject]);

  const onIdeaClick = React.useCallback((idea: IdeaDto) => {
    setIdeaDetails(idea);
    setIdeaDetailsModalVisible(true);
  }, []);

  const onIdeaDetailsModalClose = () => {
    setIdeaDetailsModalVisible(false);
    setTimeout(() => setIdeaDetails(null), 500);
  };

  const onDecision = React.useCallback(
    (idea: IdeaRequiredId, decision: DecisionDto) => {
      if (selectedSubject) {
        dispatch(
          makeDecisionOnIdeaAndGet({
            ideaId: idea.id,
            subjectId: selectedSubject.value === null ? 'others' : parseInt(selectedSubject.value),
            decision: decision
          })
        );
      }
    },
    [selectedSubject]
  );

  return (
    <DashboardContent
      title="Podejmowanie decyzji"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu mo??esz podejmowa?? decyzje dotycz??ce pomys????w ocenionych przez komisj??.'}>
      <div className={props.className}>
        {<IdeaDetailsModal isVisible={ideaDetailsModalVisible} idea={ideaDetails} onClose={onIdeaDetailsModalClose} />}
        <FlexBox className="select-category">
          <span>Wybierz temat: </span>
          <Box width={'300px'}>
            <AsyncSelect
              loadOptions={fetchSubjects}
              cacheOptions
              defaultOptions
              styles={customSelectStyles(false)}
              noOptionsMessage={() => 'Brak temat??w'}
              loadingMessage={() => '??adowanie temat??w...'}
              components={{ Option: CustomSubjectSelectOption }}
              onChange={onSelectSubject}
              placeholder={'Wybierz...'}
            />
          </Box>
        </FlexBox>
        <Box paddingBottom={'1rem'} />
        {selectedSubject && <Paragraph fontWeight={500}>{`Pomys??y w temacie "${selectedSubject.label}":`}</Paragraph>}
        {selectedSubject && ideasToDisplay ? (
          <Card>
            {(isWideTab && !isTab) || isAdditionalBreakpointForDecisionsGrid ? (
              <MobileDecisionsGrid
                ideas={ideasToDisplay}
                isOthersCategory={selectedSubject.value === null}
                maxCommitteeScore={
                  maxVotes && committeeMembers
                    ? maxVotes * committeeMembers.length
                    : committeeMembers
                      ? committeeMembers.length
                      : undefined
                }
                onIdeaClick={onIdeaClick}
                onDecision={onDecision}
              />
            ) : (
              <DesktopDecisionsGrid
                ideas={ideasToDisplay}
                isOthersCategory={selectedSubject.value === null}
                maxCommitteeScore={
                  maxVotes && committeeMembers
                    ? maxVotes * committeeMembers.length
                    : committeeMembers
                      ? committeeMembers.length
                      : undefined
                }
                onIdeaClick={onIdeaClick}
                onDecision={onDecision}
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
