import { useFormContext } from 'react-hook-form';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '~/styles/variables';
import { FormInputProps } from '~/components/forms';

const FormTextAreaBase = (props: FormInputProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();

  return (
    <MemoizeFormInput {...methods}>
      <textarea {...methods.register(id)} maxLength={1000} className={className} id={id} {...rest} />
    </MemoizeFormInput>
  );
};

export const FormTextArea = styled(FormTextAreaBase)`
  border: 0;
  border-radius: 999px;
  background-color: ${COLORS.white};
  padding: 15px;
  resize: none;
`;
