import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Button, ButtonProps } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';
import { ModalOverlay } from '~/components/ModalOverlay';

export interface ModalButtonProps extends ButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export interface ModalProps {
  content: JSX.Element;
  buttons?: ModalButtonProps[];
  className?: string;
}

const ModalBase = React.forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <ModalOverlay isVisible className={'inno-modal'}>
      <ModalWindow ref={ref}>
        {/*Needs to be a block element for proper overflow in a fixed container*/}
        <div className={props.className}>
          <Center>
            {props.content}
            {props.buttons && (
              <FlexBox id={'modal-buttons-container'}>
                {props.buttons.map((button, index) => (
                  <Button key={index} {...button} />
                ))}
              </FlexBox>
            )}
          </Center>
        </div>
      </ModalWindow>
    </ModalOverlay>
  );
});

export const Modal = styled(ModalBase)`
  max-width: 50%;
  > div {
    flex-direction: column;
  }

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
