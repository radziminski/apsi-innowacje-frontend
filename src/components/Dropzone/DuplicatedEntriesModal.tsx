import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { useDispatch } from 'react-redux';
import { removeDuplicationError } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { Button } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';

export interface DuplicatedEntriesModalProps {
  filename: string | null;
  className?: string;
}

const DuplicatedEntriesModalBase = (props: DuplicatedEntriesModalProps) => {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(removeDuplicationError());
  }, []);
  return (
    <ModalWindow>
      <Center className={props.className}>
        <span>Jeden z dodanych plików został już dodany: {props.filename || ''}.</span>
        <Button onClick={handleClick} text={'Ok'} id={'duplicated-entries-modal__ok-button'} />
      </Center>
    </ModalWindow>
  );
};

export const DuplicatedEntriesModal = styled(DuplicatedEntriesModalBase)`
  max-width: 50%;
  min-height: 20%;
  flex-direction: column;

  #duplicated-entries-modal__ok-button {
    align-self: flex-end;
    margin-top: ${({ theme }) => theme.margins.small};
  }
`;
