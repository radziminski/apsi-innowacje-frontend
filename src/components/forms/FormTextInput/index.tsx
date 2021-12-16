import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';
import { TextInput } from '~/components/forms/FormTextInput/TextInput';

const FormTextInputBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const {
    formState: { errors }
  } = methods;

  return (
    <MemoizeFormComponent {...methods}>
      <FlexBox className={className}>
        <TextInput register={methods.register(id)} errors={errors} id={id} {...rest} />
        {errors[id] && <p>{errors[id].message}</p>}
      </FlexBox>
    </MemoizeFormComponent>
  );
};

export const FormTextInput = styled(FormTextInputBase)`
  flex-direction: column;
  width: 100%;
`;
