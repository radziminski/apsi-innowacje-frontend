import { useFormContext } from 'react-hook-form';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '~/styles/variables';
import { FormInputProps } from '~/components/forms';
import { useFocusHandler } from '~/hooks/useFocusHandler';

const FormTextAreaBase = (props: FormInputProps) => {
  const { id, className, customClassName, onFocusChangeHandler, ...rest } = props;
  const methods = useFormContext();
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const { ref } = methods.register(id);
  useFocusHandler(inputRef, onFocusChangeHandler);

  return (
    <MemoizeFormInput {...methods}>
      <textarea
        {...methods.register(id)}
        maxLength={1000}
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

export const FormTextArea = styled(FormTextAreaBase)`
  border: 0;
  border-radius: 1.5rem;
  background-color: ${COLORS.white};
  padding: 15px;
  resize: none;
`;
