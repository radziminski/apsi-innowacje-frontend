import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';

const FormTextAreaBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const {
    formState: { errors }
  } = methods;

  return (
    <MemoizeFormComponent {...methods}>
      <FlexBox className={className}>
        <textarea
          {...methods.register(id)}
          maxLength={1000}
          className={'form-textarea' + (errors[id] ? '--error' : '')}
          id={id}
          {...rest}
        />
        {errors[id] && <p>{errors[id].message}</p>}
      </FlexBox>
    </MemoizeFormComponent>
  );
};

export const FormTextArea = styled(FormTextAreaBase)`
  flex-direction: column;
  width: 100%;

  .form-textarea,
  .form-textarea--error {
    border: 1px solid ${({ theme }) => theme.colors.primary}5A;
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
  }

  .form-textarea {
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
  }
  p {
    margin-top: 5px;
  }
`;
