import styled, { StyledComponentPropsWithRef } from 'styled-components';
import React from 'react';
import Loader from '../Loader';
import { COLORS } from '~/styles/variables';

export interface ButtonProps {
  className?: string;
  text?: string;
  primary?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const ButtonBase = (props: ButtonProps & StyledComponentPropsWithRef<'button'>): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { primary, isLoading, className, text, disabled, children, ...rest } = props;
  return (
    <button className={className} disabled={disabled} {...rest}>
      {isLoading ? (
        <Loader size={16} borderSize={2} margin={3} color={primary ? 'white' : COLORS.darkGray} />
      ) : (
        text ?? children
      )}
    </button>
  );
};

export const Button = styled(ButtonBase)`
  min-width: 130px;
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

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;
