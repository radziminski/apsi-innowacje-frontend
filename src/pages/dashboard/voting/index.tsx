/* eslint-disable */
import React, { Suspense, useEffect, useState } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import 'suneditor/dist/css/suneditor.min.css';
import Box, { FlexBox } from '~/components/Box';
import { useSelector } from '~/store/hooks';
import { getIdeas, getSubjects, getVotesForSubject } from '~/store/slices/CreateIdeasSlice';
import AsyncContentContainer from '~/components/AsyncContentContainer';
import { useDispatch } from 'react-redux';
import { SubjectButton } from './parts';
import { Heading6 } from '~/components/Text';
import { COLORS } from '~/styles/variables';
import IdeaCard from '~/components/IdeaCard';

export const VotingPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<number>();
  const {
    subjects,
    isLoadingSubjects,
    isSubjectsError,
    ideas,
    isLoading,
    isError,
    subjectVotes,
    isLoadingVotes,
    isVotesError
  } = useSelector(state => state.ideas);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const filteredSubjects = subjects?.filter(
    subject => currentUser?.id && subject.committeeMembers?.includes(currentUser?.id)
  );
  const filteredIdeas = ideas?.filter(idea => idea.subjectId === selectedSubject);

  useEffect(() => {
    if (!subjects) dispatch(getSubjects());
  }, [subjects]);

  useEffect(() => {
    if (!ideas) dispatch(getIdeas());
  }, [ideas]);

  useEffect(() => {
    if (filteredSubjects) {
      filteredSubjects.forEach(subject => {
        if (subject.id && !subjectVotes[subject.id]) dispatch(getVotesForSubject(subject.id));
      });
    }
  }, [filteredSubjects]);

  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      <FlexBox
        alignItems={isLoadingSubjects || isSubjectsError ? 'center' : undefined}
        flexDirection="column"
        width="100%"
        minHeight="30vh">
        <AsyncContentContainer isLoading={isLoadingSubjects} isError={isSubjectsError}>
          <Heading6 fontSize="0.85rem" fontWeight={600}>
            Wybierz temat pomysłów do głosowania:
          </Heading6>
          <Box height="1rem" flexShrink={0} />
          <FlexBox flexWrap="wrap" gap="1.5rem">
            {filteredSubjects?.length ? (
              filteredSubjects.map(subject => (
                <Box key={subject.id}>
                  <SubjectButton
                    isSelected={subject.id === selectedSubject}
                    onClick={() =>
                      subject.id !== selectedSubject ? setSelectedSubject(subject.id) : setSelectedSubject(undefined)
                    }>
                    {subject.name}
                  </SubjectButton>
                </Box>
              ))
            ) : (
              <Box marginY="25vh" textAlign="center" flexGrow={1}>
                Brak tematów pomysłów do głosowania. Poproś administratora systemu o dostęp do danego tematu.
              </Box>
            )}
          </FlexBox>
          {!!filteredSubjects?.length && (
            <Box marginTop="1.5rem">
              {selectedSubject ? (
                <AsyncContentContainer isLoading={isLoading || isLoadingVotes} isError={isError || isVotesError}>
                  {filteredIdeas?.map(idea => (
                    <Box>
                      <IdeaCard idea={idea} votingMode />
                    </Box>
                  ))}
                </AsyncContentContainer>
              ) : (
                <Box marginY="25vh" textAlign="center" flexGrow={1}>
                  Wybierz temat pomysłów aby rozpocząć głosowanie.
                </Box>
              )}
            </Box>
          )}
        </AsyncContentContainer>
      </FlexBox>
    </DashboardContent>
  );
};

export default VotingPage;
