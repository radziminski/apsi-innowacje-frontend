import React from 'react';
import styled from 'styled-components';
import {
  FormSelectInput,
  FormTextAreaInput,
  FormTextInput
} from '~/pages/dashboard/create-idea-page/components/FormInputs';
import { FlexBox } from '~/components/Box';

export type FormType = 'text' | 'select' | 'textarea' | 'createable-select';

export interface FormRowPropsBase {
  label: string;
  formId: string;
  type: FormType;
  className?: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormRowProps = FormRowPropsBase & any;

const FormRow = (props: FormRowProps): JSX.Element => {
  const { label, formId, type, className, ...rest } = props;

  const getFormComponent = (type: FormType): JSX.Element => {
    if (type == 'text') return <FormTextInput id={formId} {...rest} />;
    else if (type == 'textarea') return <FormTextAreaInput id={formId} {...rest} />;
    else if (type == 'select') return <FormSelectInput id={formId} {...rest} />;
    else if (type == 'createable-select') return <FormSelectInput id={formId} {...rest} createable />;
    else return <FormTextInput id={formId} />;
  };

  return (
    <FlexBox className={className}>
      <div>
        <label htmlFor={formId}>{label}</label>
      </div>
      <div>{getFormComponent(type)}</div>
    </FlexBox>
  );
};

export default styled(FormRow)`
  flex-direction: row;

  > div {
    width: 50%;
    display: flex;
    align-items: center;
  }
`;
