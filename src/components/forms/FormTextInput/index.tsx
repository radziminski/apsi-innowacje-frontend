import styled from 'styled-components';
import { COLORS, MARGINS } from '~/styles/variables';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import React from 'react';
import { FormInputProps } from '~/components/forms';

const FormTextInputBase = (props: FormInputProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  return (
    <MemoizeFormInput {...methods}>
      <input {...methods.register(id)} type={'text'} className={className} id={id} {...rest} />
    </MemoizeFormInput>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  border: 0;
  border-radius: 999px;
  background-color: ${COLORS.white};
  padding: 15px;
  margin: 0 ${MARGINS.small};
`;
