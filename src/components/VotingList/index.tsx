import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/store/hooks';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';
import AsyncContentContainer from '../AsyncContentContainer';
import Box from '../Box';
import VotingCard from '../VotingCard';

interface Props {
  select: (ideaId: number | undefined) => void;
  selectedIdeaId: number | undefined;
}

export const VotingList: React.FC<Props> = ({ select, selectedIdeaId }) => {
  const { ideas, isLoading, isError } = useSelector(state => state.ideas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ideas) dispatch(getIdeas());
  }, []);

  return (
    <AsyncContentContainer
      isLoading={isLoading}
      isError={isError}
      errorMessage="Wystąpił błąd z odświeżaniem pomysłów.">
      {ideas &&
        ideas.map(idea => (
          <Box key={idea.id} width="100%">
            <VotingCard isSelected={idea.id === selectedIdeaId} idea={idea} select={select} />
          </Box>
        ))}
    </AsyncContentContainer>
  );
};

export default VotingList;
