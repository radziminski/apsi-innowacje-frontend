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
  border-radius: ${({ theme }) => theme.borderRadiuses.normal};
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
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
