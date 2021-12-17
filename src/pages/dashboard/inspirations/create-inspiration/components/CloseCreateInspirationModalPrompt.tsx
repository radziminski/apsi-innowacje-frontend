import React from 'react';
import Text from '~/components/Text';
import { Modal } from '~/components/Modal';
import styled from 'styled-components';

require('suneditor/dist/css/suneditor.min.css');

interface CloseCreateInspirationModalPromptProps {
  closeModal: (exitCreation: boolean) => void;
  className?: string;
}

export const CloseCreateInspirationModalPrompt = styled((props: CloseCreateInspirationModalPromptProps) => {
  return (
    <div className={props.className}>
      <Modal
        textContent={<Text>Czy na pewno chcesz zakończyć tworzenie posta? Zmiany nie zostaną zapisane.</Text>}
        buttons={[
          {
            text: 'Tak',
            onClick: () => props.closeModal(true),
            primary: true
          },
          {
            text: 'Nie',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick: () => props.closeModal(false)
          }
        ]}
      />
    </div>
  );
})`
  > div {
    height: 100%;
  }
`;
