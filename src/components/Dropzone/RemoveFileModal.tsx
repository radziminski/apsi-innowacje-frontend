import React from 'react';
import { Modal } from '~/components/Modal';

interface RemoveFileModalProps {
  handleChoice: (confirmDelete: boolean) => void;
  filename: string;
  className?: string;
}

export const RemoveFileModal = (props: RemoveFileModalProps) => {
  return (
    <Modal
      textContent={<span>Czy na pewno chcesz usunąć plik {props.filename}?</span>}
      buttons={[
        {
          text: 'Tak',
          onClick: () => props.handleChoice(true),
          primary: true
        },
        {
          text: 'Anuluj',
          onClick: () => props.handleChoice(false)
        }
      ]}
    />
  );
};
