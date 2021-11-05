import styled from 'styled-components';
import { COLORS } from '~/styles/variables';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import React from 'react';
import { FormInputProps } from '~/components/forms';
import { useFocusHandler } from '~/hooks/useFocusHandler';

const FormTextInputBase = (props: FormInputProps) => {
  const { id, className, customClassName, onFocusChangeHandler, ...rest } = props;
  const methods = useFormContext();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { ref } = methods.register(id);
  useFocusHandler(inputRef, onFocusChangeHandler);

  return (
    <MemoizeFormInput {...methods}>
      <input
        {...methods.register(id)}
        type={'text'}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        className={`${className} ${customClassName ? customClassName : ''}`}
        id={id}
        {...rest}
      />
    </MemoizeFormInput>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  border: 0;
  border-radius: 999px;
  background-color: ${COLORS.white};
  padding: 15px;
`;
