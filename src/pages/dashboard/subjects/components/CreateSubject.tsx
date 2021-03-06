import React from 'react';
import styled from 'styled-components';
import { Card } from '~/components/Box';
import { TextInput } from '~/components/forms/FormTextInput/TextInput';
import { CreateSubjectModal } from './CreateSubjectModal';

export const CreateSubject = styled((props: { className?: string }) => {
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <>
      {modalOpened && <CreateSubjectModal closeSelf={() => setModalOpened(false)} />}
      <label htmlFor={'create-subject__input'}>
        <Card className={props.className} onClick={() => setModalOpened(true)}>
          <TextInput
            id={'create-subject__input'}
            type={'text'}
            placeholder={'Dodaj temat'}
            customClassName={'create-subject__text-input'}
            disabled
          />
        </Card>
      </label>
    </>
  );
})`
  align-items: center;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.primary}8A;
  box-shadow: 0 0 0;
  transition: box-shadow 0.15s ease-in;
  &:hover {
    box-shadow: 0 0 0.2rem ${({ theme }) => theme.colors.primary}AF;
    transition: box-shadow 0.15s ease-in;
  }
  .profile-picture {
    margin-right: ${({ theme }) => theme.spacing.s};
  }
  .create-subject__text-input {
    background-color: ${({ theme }) => theme.colors.lightGray};
    ::placeholder {
      color: black;
    }
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 0;
    }
  }
`;
