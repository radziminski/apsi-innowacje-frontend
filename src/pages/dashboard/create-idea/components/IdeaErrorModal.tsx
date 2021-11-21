import React from 'react';
import { Modal } from '~/components/Modal';

export const IdeaErrorModal = (props: { onClose: () => void }) => (
  <Modal
    textContent={<span>Błąd sieci. Nie udało się zapisać pomysłu.</span>}
    buttons={[
      {
        text: 'Ok',
        onClick: props.onClose
      }
    ]}
  />
);
