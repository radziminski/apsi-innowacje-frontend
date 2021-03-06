import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import AsyncContentContainer from '~/components/AsyncContentContainer';
import { useSelector } from '~/store/hooks';
import { SubjectCard } from '~/pages/dashboard/subjects/components/SubjectCard';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '~/store/slices/CreateUserSlice';
import { getIdeas, getSubjects } from '~/store/slices/CreateIdeasSlice';
import { CreateSubject } from '~/pages/dashboard/subjects/components/CreateSubject';
import { UserRole } from '~/api-client';

export const SubjectsOverviewPage = styled((props: { className?: string }) => {
  const { subjects, isLoadingSubjects, isSubjectsError } = useSelector(state => state.ideas);
  const { allUsers, isLoadingAllUsers } = useSelector(state => state.user);
  const { ideas, isLoading: isIdeasLoading } = useSelector(state => state.ideas);
  const { currentUser } = useSelector(state => state.user);
  const canCreateSubject = currentUser && currentUser.userRole === UserRole.Admin;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if ((!subjects || subjects.length === 0) && !isLoadingSubjects) {
      dispatch(getSubjects());
    }

    if (!allUsers && !isLoadingAllUsers) {
      dispatch(getAllUsers());
    }

    if (ideas === null && !isIdeasLoading) {
      dispatch(getIdeas());
    }
  }, []);

  return (
    <DashboardContent
      title="Przegląd tematów"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={
        'W tym panelu możesz przeglądać ' + (canCreateSubject ? 'oraz tworzyć nowe ' : '') + 'tematy pomysłów.'
      }>
      {canCreateSubject && <CreateSubject />}
      <AsyncContentContainer
        isLoading={isLoadingSubjects}
        isError={isSubjectsError}
        errorMessage="Wystąpił błąd podczas pobierania tematów.">
        <FlexBox className={props.className}>
          {subjects &&
            subjects.map(
              subject =>
                subject.id && (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    ideas={
                      ideas
                        ? ideas.filter(idea => idea.subjectId && idea.subjectId === subject.id)
                        : isIdeasLoading
                        ? null
                        : []
                    }
                  />
                )
            )}
        </FlexBox>
      </AsyncContentContainer>
    </DashboardContent>
  );
})`
  flex-direction: column;
`;
