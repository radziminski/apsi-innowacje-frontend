import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { Button } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';
import { ModalOverlay } from '~/components/ModalOverlay';

export interface ModalButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
}

export interface ModalProps {
  textContent: JSX.Element;
  buttons?: ModalButtonProps[];
  className?: string;
}

const ModalBase = (props: ModalProps) => {
  return (
    <ModalOverlay isVisible>
      <ModalWindow>
        <Center className={props.className}>
          {props.textContent}
          {props.buttons &&
            props.buttons.map((button, index) => <Button key={index} onClick={button.onClick} text={button.text} />)}
        </Center>
      </ModalWindow>
    </ModalOverlay>
  );
};

export const Modal = styled(ModalBase)`
  max-width: 50%;
  flex-direction: column;

  button {
    align-self: flex-end;
    margin-top: ${({ theme }) => theme.spacing.s};
  }
  button + button {
    margin-left: ${({ theme }) => theme.spacing.s};
  }
`;
