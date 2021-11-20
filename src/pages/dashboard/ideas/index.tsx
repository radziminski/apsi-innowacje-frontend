import React, { useEffect } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { CenteredLoader } from '~/components/Loader';
import { Heading3 } from '~/components/Text';
import { useSelector } from '~/store/hooks';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';

export const IdeasPage: React.FC = () => {
  const { ideas, isLoading, isError } = useSelector(state => state.ideas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ideas) dispatch(getIdeas());
  }, []);

  return (
    <DashboardContent title="Pomysły na innowacje" icon={<MdOutlineDashboard size={28} />}>
      {isLoading && <CenteredLoader />}
      {isError && <Heading3>Wystąpił błąd podczas pobierania pomysłów.</Heading3>}
      {ideas && ideas.map(idea => <div key={idea.id}>{idea.title}</div>)}
    </DashboardContent>
  );
};

export default IdeasPage;
