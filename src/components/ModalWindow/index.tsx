import React from 'react';
import styled from 'styled-components';

const ModalWindowBase = (props: React.PropsWithChildren<{ className?: string }>) => {
  return <div className={props.className}>{props.children}</div>;
};

export const ModalWindow = styled(ModalWindowBase)`
  > div {
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.margins.medium} ${({ theme }) => theme.margins.small};
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    max-height: 90%;
    max-width: 90%;
  }
`;
