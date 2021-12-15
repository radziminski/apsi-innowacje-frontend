import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import React from 'react';

const TextAreaBase = (props: FormComponentProps) => {
  const { className, register, customClassName, ...rest } = props;

  return (
    <textarea
      {...(register ? register : {})}
      maxLength={1000}
      {...rest}
      className={className + (customClassName ? ` ${customClassName}` : '')}
    />
  );
};

export const TextArea = styled(TextAreaBase)`
  border: 1px solid
    ${props => (props.errors && props.errors[props.id] ? props.theme.colors.error : props.theme.colors.primary)}5A;
  border-radius: ${({ theme }) => theme.borderRadiuses.normal};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 15px;
  resize: none;
  box-shadow: none;
  transition: box-shadow 0.15s ease-in-out;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }

  &:hover {
    box-shadow: 0 0 0.15rem
      ${({ id, errors, theme }) => (errors && errors[id] ? theme.colors.error : theme.colors.primary)}AF;
  }

  &:focus {
    box-shadow: 0 0 0.25rem
      ${({ id, errors, theme }) => (errors && errors[id] ? theme.colors.error : theme.colors.primary)}AF;
  }
`;
