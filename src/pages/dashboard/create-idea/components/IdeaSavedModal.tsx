import React from 'react';
import { Modal } from '~/components/Modal';

export const IdeaSavedModal = (props: { onClose: () => void }) => (
  <Modal
    textContent={<span>Dziękujemy za dodanie pomysłu.</span>}
    buttons={[
      {
        text: 'Zamknij',
        onClick: props.onClose
      }
    ]}
  />
);
