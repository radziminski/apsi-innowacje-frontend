import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { useClassNameOnFocus } from '~/hooks/useClassNameOnFocus';

const FormTextInputBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const methods = useFormContext();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref } = methods.register(id);
  const classNameSuffix = useClassNameOnFocus('--active', inputRef);

  return (
    <MemoizeFormComponent {...methods}>
      <input
        {...methods.register(id)}
        type={props.type || 'text'}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        className={`${className} ${customClassName ? customClassName + classNameSuffix : ''}`}
        id={id}
        {...rest}
      />
    </MemoizeFormComponent>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  border: 0;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0.8rem ${({ theme }) => theme.margins.small};
  input {
    width: 100%;
    ::placeholder {
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;
