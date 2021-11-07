import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import { useClassNameOnFocus } from '~/hooks/useClassNameOnFocus';
import { FlexBox } from '~/components/Box';

const FormTextAreaBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const methods = useFormContext();
  const {
    formState: { errors }
  } = methods;
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const { ref } = methods.register(id);
  const classNameSuffix = useClassNameOnFocus('--active', inputRef);

  return (
    <MemoizeFormComponent {...methods}>
      <FlexBox className={className}>
        <textarea
          {...methods.register(id)}
          maxLength={1000}
          ref={e => {
            ref(e);
            inputRef.current = e;
          }}
          className={`${customClassName ? customClassName + classNameSuffix + (errors[id] ? '--error' : '') : ''}`}
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

  textarea {
    border: 0;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 15px;
    resize: none;
  }
  p {
    margin-top: 5px;
  }
`;
