import RollerLoader from '~/components/RollerLoader';
import { ModalOverlay } from '~/components/ModalOverlay';
import React from 'react';
import { Modal } from '~/components/Modal';
import styled from 'styled-components';

export const LoadingModal = styled((props: { textContent?: string; className?: string }) => (
  <ModalOverlay isVisible>
    <Modal
      content={
        <>
          <RollerLoader />
          {props.textContent && <span className={props.className}>{props.textContent}</span>}
        </>
      }
    />
  </ModalOverlay>
))`
  margin-top: ${({ theme }) => theme.spacing.s};
`;
