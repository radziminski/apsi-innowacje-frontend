import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';
import { ModalOverlay } from '~/components/ModalOverlay';

export interface ModalButtonProps {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  primary?: boolean;
}

export interface ModalProps {
  textContent: JSX.Element;
  buttons?: ModalButtonProps[];
  className?: string;
}

const ModalBase = React.forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ModalOverlay isVisible className={'inno-modal'}>
      <ModalWindow ref={ref}>
        <Center className={props.className}>
          {props.textContent}
          <FlexBox id={'modal-buttons-container'}>
            {props.buttons &&
              props.buttons.map((button, index) => (
                <Button key={index} onClick={button.onClick} text={button.text} primary={button.primary} />
              ))}
          </FlexBox>
        </Center>
      </ModalWindow>
    </ModalOverlay>
  );
});

export const Modal = styled(ModalBase)`
  max-width: 50%;
  flex-direction: column;

  #modal-buttons-container {
    width: 100%;
    justify-content: flex-end;
  }

  button {
    align-self: flex-end;
    margin-top: ${({ theme }) => theme.spacing.s};
  }
  button + button {
    margin-left: ${({ theme }) => theme.spacing.s};
  }
`;
