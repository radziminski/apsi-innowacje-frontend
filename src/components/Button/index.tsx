import styled from 'styled-components';
import React from 'react';

export interface ButtonProps {
  className?: string;
  text: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const ButtonBase = (props: ButtonProps & any): JSX.Element => {
  const { className, text, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {text}
    </button>
  );
};

export const Button = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 1.5rem;
  margin: ${({ theme }) => theme.margins.small};
  margin-left: 0;
  padding: ${({ theme }) => theme.margins.small} ${({ theme }) => theme.margins.medium};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.accent3};
  }
  transition: background-color 0.2s ease-in-out;

  &:active,
  &:hover {
    transition: background-color 0.2s ease-in-out;
  }
`;
