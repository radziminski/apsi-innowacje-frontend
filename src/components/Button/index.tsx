import styled from 'styled-components';
import React from 'react';

export interface ButtonProps {
  className?: string;
  text: string;
  primary?: boolean;
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
  background-color: ${props => (props.primary ? props.theme.colors.primary : props.theme.colors.secondary)};
  border-radius: ${({ theme }) => theme.borderRadiuses.normal};
  padding: ${({ theme }) => theme.spacing.s} ${({ theme }) => theme.spacing.m};
  color: ${props => (props.primary ? props.theme.colors.primaryLight : props.theme.colors.black)};
  &:hover {
    background-color: ${props => (props.primary ? props.theme.colors.primaryHover : props.theme.colors.secondaryHover)};
  }
  &:active {
    background-color: ${props =>
      props.primary ? props.theme.colors.primaryActive : props.theme.colors.secondaryActive};
  }
  transition: background-color 0.2s ease-in-out;

  &:active,
  &:hover {
    transition: background-color 0.2s ease-in-out;
  }
`;
