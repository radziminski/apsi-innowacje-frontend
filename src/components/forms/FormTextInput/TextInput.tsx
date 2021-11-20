import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import React from 'react';

const TextInputBase = (props: FormComponentProps) => {
  const { id, className, register, customClassName, ...rest } = props;

  return (
    <input
      {...(register ? register : {})}
      id={id}
      type={props.type || 'text'}
      className={
        className +
        ' form_input' +
        (rest.errors && rest.errors[id] ? '--error' : '') +
        (customClassName ? ` ${customClassName}` : '')
      }
      {...rest}
    />
  );
};

export const TextInput = styled(TextInputBase)`
  &.form_input,
  &.form_input--error {
    box-shadow: none;
    transition: box-shadow 0.15s ease-in-out;
    width: 100%;
    ::placeholder {
      color: ${({ theme }) => theme.colors.lightGray};
    }
    border: 0;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0.8rem ${({ theme }) => theme.margins.small};
  }

  &.form_input {
    &:hover {
      box-shadow: 0 0 0.15rem ${({ theme }) => theme.colors.primary}AF;
    }
    &--error:hover {
      box-shadow: 0 0 0.15rem ${({ theme }) => theme.colors.error}AF;
    }

    &:focus {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary}AF;
    }

    &--error:focus {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.error}AF;
    }

    &:hover,
    &--error:hover {
      transition: box-shadow 0.15s ease-in;
    }
  }
`;
