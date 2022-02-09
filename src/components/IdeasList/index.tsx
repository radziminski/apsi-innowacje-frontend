import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/store/hooks';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';
import AsyncContentContainer from '../AsyncContentContainer';
import Box from '../Box';
import IdeaCard from '../IdeaCard';
import { getAllUsers } from '~/store/slices/CreateUserSlice';

export const IdeasList: React.FC = () => {
  const { ideas, isLoading, isError } = useSelector(state => state.ideas);
  const { allUsers, isLoadingAllUsers, isErrorAllUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ideas) dispatch(getIdeas());
    if (!allUsers && !isLoadingAllUsers && !isErrorAllUsers) dispatch(getAllUsers());
  }, []);

  return (
    <AsyncContentContainer
      isLoading={isLoading || isLoadingAllUsers}
      isError={isError}
      errorMessage="Wystąpił błąd z odświeżaniem pomysłów.">
      {ideas &&
        (allUsers || isErrorAllUsers) &&
        ideas.map(idea => (
          <Box key={idea.id} width={'100%'}>
            <IdeaCard idea={idea} />
          </Box>
        ))}
    </AsyncContentContainer>
  );
};

export default IdeasList;
