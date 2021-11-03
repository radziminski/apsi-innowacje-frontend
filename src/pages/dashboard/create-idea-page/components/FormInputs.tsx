import React from 'react';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';

export interface FormTextInputProps {
  id: string;
  className?: string;
}

const FormTextInputBase = (props: FormTextInputProps) => {
  const methods = useFormContext();
  return (
    <MemoizeFormInput {...methods}>
      <input {...methods.register(props.id)} type={'text'} className={props.className} id={props.id} />
    </MemoizeFormInput>
  );
};

const FormTextAreaInputBase = (props: FormTextInputProps) => {
  const methods = useFormContext();

  return (
    <MemoizeFormInput {...methods}>
      <textarea {...methods.register(props.id)} maxLength={1000} className={props.className} id={props.id} />
    </MemoizeFormInput>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  border: 0;
  border-radius: 999px;
  background-color: #eee;
  padding: 15px;
  margin: ${MARGINS.medium};
`;

export const FormTextAreaInput = styled(FormTextAreaInputBase)`
  border: 0;
  border-radius: 999px;
  background-color: #eee;
  padding: 15px;
  margin: ${MARGINS.medium};
  resize: none;
`;
