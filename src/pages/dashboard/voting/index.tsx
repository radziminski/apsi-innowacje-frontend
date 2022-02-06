import React, { useEffect, useState } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import 'suneditor/dist/css/suneditor.min.css';
import Box, { FlexBox } from '~/components/Box';
import { useSelector } from '~/store/hooks';
import {
  getIdeas,
  getSubjects,
  getVotesForSubject,
  voteForSubjectIdeas,
  voteForUncategorizedIdea
} from '~/store/slices/CreateIdeasSlice';
import AsyncContentContainer from '~/components/AsyncContentContainer';
import { useDispatch } from 'react-redux';
import { SubjectButton, RatingButton, SendButton, VoteButton } from './parts';
import Text, { Heading4, Heading6 } from '~/components/Text';
import IdeaCard from '~/components/IdeaCard';

export const VotingPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>();
  const [selectedVotes, setSelectedVotes] = useState<Record<number, number>>({});

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
    subject =>
      currentUser?.id &&
      subject.committeeMembers?.includes(currentUser?.id) &&
      ideas?.filter(idea => idea.subjectId === subject.id).every(idea => !idea.alreadyVoted)
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

  const currVotes = selectedSubject && subjectVotes[selectedSubject];

  const setVote = (ideaId: number, voteValue: number) => {
    setSelectedVotes(prev => {
      if (Object.values(prev).includes(ideaId)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const entry = Object.entries(prev).find(([_, value]) => value === ideaId);
        if (entry) delete prev[entry[0]];
      }

      return {
        ...prev,
        [voteValue]: ideaId
      };
    });
  };

  useEffect(() => {
    setSelectedVotes({});
  }, [selectedSubject]);

  const sendVotes = async () => {
    const votes = {};
    Object.keys(selectedVotes).map(key => {
      const newKey = selectedVotes[key].toString();
      votes[newKey] = parseInt(key);
    });
    if (selectedSubject) await dispatch(voteForSubjectIdeas({ subjectId: selectedSubject, votes }));
  };

  const voteUncategorized = async (ideaId: number | undefined, accept: boolean) => {
    if (ideaId) await dispatch(voteForUncategorizedIdea({ ideaId, accept }));
    dispatch(getIdeas());
  };

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
            {
              <SubjectButton isSelected={selectedSubject === null} onClick={() => setSelectedSubject(null)}>
                Inne
              </SubjectButton>
            }
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
          {!!currVotes && Object.keys(selectedVotes).length < currVotes && (
            <Box marginTop="2rem">
              <Heading4 fontWeight={600}>Pozostałe głosy: </Heading4>
              <FlexBox gap="1rem" marginTop="0.5rem">
                {Array.from(Array(currVotes).keys())
                  .filter(key => !Object.keys(selectedVotes).includes('' + (key + 1)))
                  .map(key => (
                    <RatingButton key={key + 1}>
                      <Text fontSize="1.15rem">{key + 1}</Text>
                    </RatingButton>
                  ))}
              </FlexBox>
            </Box>
          )}

          {!!filteredSubjects?.length && (
            <Box marginTop="1.5rem">
              {selectedSubject !== undefined ? (
                <AsyncContentContainer isLoading={isLoading || isLoadingVotes} isError={isError || isVotesError}>
                  {filteredIdeas?.map(
                    idea =>
                      !idea.alreadyVoted && (
                        <Box key={idea.id}>
                          <IdeaCard idea={idea} votingMode />
                          {selectedSubject !== null ? (
                            <Box paddingLeft="1.5rem" marginBottom="3rem">
                              <Heading4>Oddaj Głos: </Heading4>
                              <FlexBox gap="1rem" marginTop="0.5rem">
                                {Array.from(Array(currVotes).keys()).map(key => (
                                  <RatingButton
                                    key={key}
                                    onClick={() => idea.id && setVote(idea.id, key + 1)}
                                    isSelected={selectedVotes[key + 1] === idea.id}>
                                    <Text fontSize="1.15rem">{key + 1}</Text>
                                  </RatingButton>
                                ))}
                              </FlexBox>
                            </Box>
                          ) : (
                            <FlexBox justifyContent="space-evenly">
                              <VoteButton
                                onClick={() => {
                                  voteUncategorized(idea.id, true);
                                }}>
                                <Text fontSize="1.3rem">Yes</Text>
                              </VoteButton>
                              <VoteButton
                                onClick={() => {
                                  voteUncategorized(idea.id, false);
                                }}>
                                <Text fontSize="1.3rem">No</Text>
                              </VoteButton>
                            </FlexBox>
                          )}
                        </Box>
                      )
                  )}

                  {
                    <Box opacity={Object.keys(selectedVotes).length === currVotes ? 1 : 0} transition="all 0.2s">
                      <SendButton onClick={sendVotes}>Wyślij oceny</SendButton>
                    </Box>
                  }
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
