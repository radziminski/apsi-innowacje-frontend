import React from 'react';
import { Card } from '~/components/Box';
import { ProfilePicture } from '~/pages/dashboard/inspiration-page/components/ProfilePicture';
import { TextInput } from '~/components/forms/FormTextInput/TextInput';
import styled from 'styled-components';
import { CreateInspirationModal } from '~/pages/dashboard/inspiration-page/components/CreateInspirationModal';

const CreateInspirationBase = (props: { className?: string }) => {
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);

  return (
    <>
      {modalOpened && <CreateInspirationModal closeModal={() => setModalOpened(false)} />}
      <label htmlFor={'create-post__input'}>
        <Card className={props.className} onClick={() => setModalOpened(true)}>
          <ProfilePicture />
          <TextInput
            id={'create-post__input'}
            type={'text'}
            placeholder={'Prześlij pomysł'}
            customClassName={'create-inspiration__text-input'}
            disabled
          />
        </Card>
      </label>
    </>
  );
};

export const CreateInspiration = styled(CreateInspirationBase)`
  align-items: center;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.primary}8A;
  .profile-picture {
    margin-right: ${({ theme }) => theme.margins.small};
  }
  .form_input.create-inspiration__text-input {
    background-color: ${({ theme }) => theme.colors.lightGray};
    ::placeholder {
      color: black;
    }
    cursor: pointer;
  }
`;
