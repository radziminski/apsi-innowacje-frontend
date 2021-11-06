import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { useDispatch } from 'react-redux';
import { removeDuplicationError } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { Button } from '~/components/Button';

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
    <Center className={props.className}>
      <div>Jeden z dodanych plików został już dodany: {props.filename || ''}.</div>
      <Button onClick={handleClick} text={'Ok'} id={'duplicated-entries-modal__ok-button'} />
    </Center>
  );
};

export const DuplicatedEntriesModal = styled(DuplicatedEntriesModalBase)`
  width: 50%;
  min-height: 20%;
  flex-direction: column;

  * {
    margin: ${({ theme }) => theme.margins.small};
  }

  #duplicated-entries-modal__ok-button {
    align-self: flex-end;
  }
`;
