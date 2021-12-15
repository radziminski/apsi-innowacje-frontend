import { useFormContext } from 'react-hook-form';
import { MemoizeFormComponent } from '~/components/forms/util/MemoizeFormComponent';
import React from 'react';
import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';
import { TextArea } from '~/components/forms/FormTextArea/TextArea';

const FormTextAreaBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const {
    formState: { errors }
  } = methods;

  return (
    <MemoizeFormComponent {...methods}>
      <FlexBox className={className}>
        <TextArea register={methods.register(id)} errors={errors} id={id} {...rest} />
        {errors[id] && <p>{errors[id].message}</p>}
      </FlexBox>
    </MemoizeFormComponent>
  );
};

export const FormTextArea = styled(FormTextAreaBase)`
  flex-direction: column;
  width: 100%;
  p {
    margin-top: 5px;
  }
`;
