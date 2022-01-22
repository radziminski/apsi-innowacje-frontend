import { Modal } from '~/components/Modal';
import React from 'react';

interface DeleteInspirationModalProps {
  onConfirm: (e) => void;
  onClose: (e) => void;
}

export const DeleteInspirationModal = (props: DeleteInspirationModalProps) => {
  return (
    <Modal
      content={<span>Czy na pewno chcesz usunąć tę inspirację?</span>}
      buttons={[
        {
          text: 'Powrót',
          onClick: props.onClose
        },
        {
          text: 'Tak',
          onClick: props.onConfirm,
          primary: true
        }
      ]}
    />
  );
};
