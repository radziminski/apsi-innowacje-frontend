import React from 'react';
import styled from 'styled-components';
// import { FlexBox } from '~/components/Box';
import { FormTextAreaInput, FormTextInput } from '~/pages/dashboard/create-idea-page/components/FormInputs';
import { FlexBox } from '~/components/Box';

export type FormType = 'text' | 'select' | 'textarea';

export interface FormRowProps {
  label: string;
  formId: string;
  type: FormType;
  className?: string;
}

const FormRow = (props: FormRowProps): JSX.Element => {
  const getFormComponent = (type: FormType): JSX.Element => {
    if (type == 'text') return <FormTextInput id={props.formId} />;
    else if (type == 'textarea') return <FormTextAreaInput id={props.formId} />;
    else return <FormTextInput id={props.formId} />;
  };

  return (
    <FlexBox className={props.className}>
      <div>
        <label htmlFor={props.formId}>{props.label}</label>
      </div>
      <div>{getFormComponent(props.type)}</div>
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
