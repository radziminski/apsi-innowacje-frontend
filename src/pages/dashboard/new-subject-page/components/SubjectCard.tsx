import React from 'react';
import styled from 'styled-components';
import Box, { Card, FlexBox } from '~/components/Box';
import { Heading4, Heading5 } from '~/components/Text';
import { IdeaDto, SubjectDto, SubjectDtoAudienceEnum, UserDto } from '~/api-client';
import { useSelector } from '~/store/hooks';

interface SubjectCardProps {
  subject: SubjectDto;
  ideas: IdeaDto[] | null;
  className?: string;
}

const InfoRow = (props: { title: string; content: React.ReactNode }) => {
  return (
    <Box className={'info-row'}>
      <Heading5 style={{ display: 'inline' }}>{props.title}: </Heading5>
      {props.content}
    </Box>
  );
};

export const SubjectCard = styled((props: SubjectCardProps) => {
  const { subject } = props;
  const [committeeInSubject, setCommitteeInSubject] = React.useState<UserDto[]>([]);
  const { allUsers, isLoadingAllUsers, isErrorAllUsers } = useSelector(state => state.user);

  React.useEffect(() => {
    if (allUsers.length > 0) {
      setCommitteeInSubject(
        allUsers.filter(
          user => subject.committeeMembers && subject.committeeMembers.some(memberId => memberId === user.id)
        )
      );
    }
  }, [allUsers]);

  let audience;
  switch (props.subject.audience) {
    case SubjectDtoAudienceEnum.Admin:
      audience = 'Administracja';
      break;
    case SubjectDtoAudienceEnum.Committee:
      audience = 'Komisja';
      break;
    case SubjectDtoAudienceEnum.Employee:
      audience = 'Wykładowcy';
      break;
    case SubjectDtoAudienceEnum.Student:
      audience = 'Studenci';
      break;
    default:
      audience = 'Nieznana';
  }
  return (
    <Card className={props.className}>
      <FlexBox paddingBottom={'1rem'}>
        <Heading4 fontSize="1.35rem" fontWeight={500}>
          {props.subject.name ?? 'Nieznany tytuł'}
        </Heading4>
      </FlexBox>
      <InfoRow title={'Grupa docelowa'} content={audience} />
      <InfoRow title={'Głosowanie'} content={subject.done ? 'Zakończone' : 'W trakcie'} />
      <InfoRow
        title={'Liczba zgłoszonych pomysłów'}
        content={props.ideas ? `${props.ideas.length}` : 'Pobieranie...'}
      />
      <InfoRow
        title={'Komisja'}
        content={
          isLoadingAllUsers
            ? 'Pobieranie...'
            : isErrorAllUsers
            ? 'Brak informacji'
            : committeeInSubject.length === 0
            ? 'Brak'
            : committeeInSubject.map(
                committeeMember =>
                  committeeMember.id && (
                    <p key={committeeMember.id}>{`${committeeMember.firstName} ${committeeMember.lastName}`}</p>
                  )
              )
        }
      />
    </Card>
  );
})`
  flex-direction: column;
  .info-row + .info-row {
    padding-top: ${({ theme }) => theme.spacing.xs};
  }
`;
