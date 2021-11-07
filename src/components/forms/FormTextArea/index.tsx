import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import { useClassNameOnFocus } from '~/hooks/useClassNameOnFocus';

const FormTextAreaBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const methods = useFormContext();
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const { ref } = methods.register(id);
  const classNameSuffix = useClassNameOnFocus('--active', inputRef);

  return (
    <MemoizeFormComponent {...methods}>
      <textarea
        {...methods.register(id)}
        maxLength={1000}
        ref={e => {
          ref(e);
          inputRef.current = e;
        }}
        className={`${className} ${customClassName + classNameSuffix || ''}`}
        id={id}
        {...rest}
      />
    </MemoizeFormComponent>
  );
};

export const FormTextArea = styled(FormTextAreaBase)`
  border: 0;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 15px;
  resize: none;
`;
