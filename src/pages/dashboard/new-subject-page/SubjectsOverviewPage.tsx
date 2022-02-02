import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { MdOutlineRateReview } from 'react-icons/md';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import AsyncContentContainer from '~/components/AsyncContentContainer';
import { useSelector } from '~/store/hooks';
import { SubjectCard } from '~/pages/dashboard/new-subject-page/components/SubjectCard';
import { useDispatch } from 'react-redux';
import { getAllSubjects } from '~/store/slices/CreateSubjectsSlice';
import { getAllUsers } from '~/store/slices/CreateUserSlice';

export const SubjectsOverviewPage = styled((props: { className?: string }) => {
  const { subjects, isLoading, isError } = useSelector(state => state.subjects);
  const { allUsers, isLoadingAllUsers } = useSelector(state => state.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (subjects.length === 0 && !isLoading) {
      dispatch(getAllSubjects());
    }

    if (allUsers.length === 0 && !isLoadingAllUsers) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <DashboardContent
      title="Przegląd tematów"
      icon={<MdOutlineRateReview size={28} />}
      subTitle={'W tym panelu możesz dodać przeglądać oraz tworzyć nowe tematy pomysłów.'}>
      <AsyncContentContainer
        isLoading={subjects === null && isLoading}
        isError={subjects === null && isError}
        errorMessage="Wystąpił błąd podczas odświeżania tematów.">
        <FlexBox className={props.className}>
          {subjects && subjects.map(subject => subject.id && <SubjectCard key={subject.id} subject={subject} />)}
        </FlexBox>
      </AsyncContentContainer>
    </DashboardContent>
  );
})`
  flex-direction: column;
`;
