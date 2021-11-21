import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/store/hooks';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';
import AsyncContentContainer from '../AsyncContentContainer';
import Box from '../Box';
import IdeaCard from '../IdeaCard';

export const IdeasList: React.FC = () => {
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
          <Box key={idea.id} maxWidth="900px">
            <IdeaCard idea={idea} />
          </Box>
        ))}
    </AsyncContentContainer>
  );
};

export default IdeasList;
