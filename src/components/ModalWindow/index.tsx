import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

const ModalWindowBase = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ className?: string }>>(
  (props: React.PropsWithChildren<{ className?: string }>, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={props.className}>
        {props.children}
      </div>
    );
  }
);

export const ModalWindow = styled(ModalWindowBase)`
  > div {
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.m};
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    max-height: 90%;
    max-width: 90%;
    border-radius: ${({ theme }) => theme.borderRadiuses.small};
  }
`;
