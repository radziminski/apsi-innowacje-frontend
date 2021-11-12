import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { FormTextInput } from '~/components/forms/FormTextInput';
import { FormAsyncSelect } from '~/components/forms/FormAsyncSelect';
import { FormCreateableSelect } from '~/components/forms/FormCreateableSelect';
import { FormTextArea } from '~/components/forms/FormTextArea';
import { FormDropzone } from '~/components/forms/FormDropzone';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';
import { FormCheckbox } from '~/components/forms/FormCheckbox';
import { FormSelect } from '~/components/forms/FormSelect';

export type FormType = 'text' | 'select' | 'textarea' | 'createable-select' | 'async-select' | 'password';

export interface FormRowPropsBase {
  label: string;
  formId: string;
  type?: FormType;
  tooltip?: string;
  customFormComponent?: JSX.Element;
  className?: string;
  required?: boolean;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormRowProps = FormRowPropsBase & any;

const FormRowBase = (props: FormRowProps): JSX.Element => {
  const { label, formId, className, customFormComponent, required, ...rest } = props;
  const type = props.type || '';

  const getFormComponent = (type: FormType): JSX.Element => {
    const component_props = {
      id: formId,
      ...rest
    };
    if (type === 'text') return <FormTextInput {...component_props} />;
    else if (type === 'password') return <FormTextInput {...component_props} />;
    else if (type === 'textarea') return <FormTextArea {...component_props} />;
    else if (type === 'async-select') return <FormAsyncSelect {...component_props} />;
    else if (type === 'select') return <FormSelect {...component_props} />;
    else if (type === 'createable-select') return <FormCreateableSelect {...component_props} />;
    else if (type === 'dropzone') return <FormDropzone {...component_props} />;
    else if (type === 'checkbox') return <FormCheckbox {...component_props} />;
    else if (customFormComponent) return React.cloneElement(customFormComponent, component_props);
    else return <FormTextInput {...component_props} />;
  };

  return (
    <FlexBox className={`${className} form-row`}>
      <div>
        <label htmlFor={formId}>{label}</label>
        {required ? <Asterisk /> : null}
      </div>
      <div>{getFormComponent(type)}</div>
    </FlexBox>
  );
};

export const FormRow = styled(FormRowBase)`
  flex-direction: row;
  margin: ${({ theme }) => theme.margins.small};
  align-items: center;

  > div {
    display: flex;

    label {
      font-weight: 400;
    }

    &:first-child {
      width: 40%;
    }
    &:nth-child(2) {
      width: 60%;
    }
  }
`;
