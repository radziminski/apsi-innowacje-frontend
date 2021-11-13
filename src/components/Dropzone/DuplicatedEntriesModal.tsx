import React from 'react';
import { useDispatch } from 'react-redux';
import { removeDuplicationError } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { Modal } from '~/components/Modal';

export interface DuplicatedEntriesModalProps {
  filename: string | null;
}

export const DuplicatedEntriesModal = (props: DuplicatedEntriesModalProps) => {
  const dispatch = useDispatch();
  const handleClick = React.useCallback(() => {
    dispatch(removeDuplicationError());
  }, []);
  return (
    <Modal
      textContent={<span>{`Jeden z dodanych plików został już dodany: ${props.filename || ''}.`}</span>}
      buttons={[
        {
          text: 'Ok',
          onClick: handleClick
        }
      ]}
    />
  );
};
