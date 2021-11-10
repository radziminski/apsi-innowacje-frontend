import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';

const FormTextInputBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const {
    formState: { errors }
  } = methods;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref } = methods.register(id);

  return (
    <MemoizeFormComponent {...methods}>
      <FlexBox className={className}>
        <input
          {...methods.register(id)}
          type={props.type || 'text'}
          ref={e => {
            ref(e);
            inputRef.current = e;
          }}
          className={'form_input' + (errors[id] ? '--error' : '')}
          id={id}
          {...rest}
        />
        {errors[id] && <p>{errors[id].message}</p>}
      </FlexBox>
    </MemoizeFormComponent>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  flex-direction: column;
  .form_input,
  .form_input--error {
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

  .form_input {
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
