import React from 'react';
import { Modal } from '~/components/Modal';
import styled from 'styled-components';

export const InspirationSavedModal = styled((props: { onClose: () => void; className?: string }) => (
  <div className={props.className}>
    <Modal
      textContent={<span>Dziękujemy za dodanie inspiracji.</span>}
      buttons={[
        {
          text: 'Zamknij',
          onClick: props.onClose
        }
      ]}
    />
  </div>
))`
  > div {
    height: 100%;
  }
`;
