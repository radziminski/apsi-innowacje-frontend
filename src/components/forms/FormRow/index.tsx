import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { COLORS, MARGINS } from '~/styles/variables';
import { FormTextInput } from '~/components/forms/FormTextInput';
import { FormAsyncSelect } from '~/components/forms/FormAsyncSelect';
import { FormCreateableSelect } from '~/components/forms/FormCreateableSelect';
import { FormTextArea } from '~/components/forms/FormTextArea';

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
    else if (type == 'textarea') return <FormTextArea id={formId} {...rest} />;
    else if (type == 'select') return <FormAsyncSelect id={formId} {...rest} />;
    else if (type == 'createable-select') return <FormCreateableSelect id={formId} {...rest} />;
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
  margin: ${MARGINS.small};
  > div {
    width: 50%;
    display: flex;
    align-items: top;

    label {
      margin-top: ${MARGINS.small};
    }
  }

  input,
  select,
  textarea {
    margin: 0 ${MARGINS.small};
    width: 100%;
    ::placeholder {
      color: ${COLORS.gray};
      opacity: 1;
    }
  }
`;
