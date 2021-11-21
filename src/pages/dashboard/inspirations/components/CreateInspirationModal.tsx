import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { ModalWindow } from '~/components/ModalWindow';
import { ModalOverlay } from '~/components/ModalOverlay';
import { useOutsideClick } from '~/hooks/useOutsideClick';

interface CreateInspirationModalProps {
  closeModal: () => void;
  className?: string;
}

const CreateInspirationModalBase = (props: CreateInspirationModalProps) => {
  const modalRef = React.createRef<HTMLDivElement>();
  useOutsideClick(modalRef, props.closeModal);

  return (
    <ModalOverlay isVisible>
      <ModalWindow ref={modalRef}>
        <Center className={props.className}>Tu będzie modal do tworzenia inspiracji</Center>
      </ModalWindow>
    </ModalOverlay>
  );
};

export const CreateInspirationModal = styled(CreateInspirationModalBase)``;
