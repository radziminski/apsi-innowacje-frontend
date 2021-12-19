import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import React from 'react';
import classNames from 'classnames';

const TextInputBase = (props: FormComponentProps) => {
  const { className, register, customClassName, ...rest } = props;

  return (
    <input
      {...(register ? register : {})}
      type={props.type || 'text'}
      className={classNames(className, customClassName)}
      {...rest}
    />
  );
};

export const TextInput = styled(TextInputBase)`
  box-shadow: none;
  transition: box-shadow 0.15s ease-in-out;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }
  border: 1px solid ${({ id, errors, theme }) => (errors && errors[id] ? theme.colors.error : theme.colors.primary)}5A;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem ${({ theme }) => theme.spacing.s};
  &:hover {
    box-shadow: 0 0 0.15rem
      ${({ id, errors, theme }) => (errors && errors[id] ? theme.colors.error : theme.colors.primary)}AF;
  }

  &:focus {
    box-shadow: 0 0 0.25rem
      ${({ id, errors, theme }) => (errors && errors[id] ? theme.colors.error : theme.colors.primary)}AF;
  }
`;
