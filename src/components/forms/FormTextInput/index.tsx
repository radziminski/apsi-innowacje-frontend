import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';

const FormTextInputBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
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
          className={`${customClassName ? customClassName + (errors[id] ? '--error' : '') : ''}`}
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
  input {
    border: 0;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0.8rem ${({ theme }) => theme.margins.small};

    width: 100%;
    ::placeholder {
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;
