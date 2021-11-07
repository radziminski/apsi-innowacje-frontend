import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { MARGINS } from '~/styles/variables';
import { FormTextInput } from '~/components/forms/FormTextInput';
import { FormAsyncSelect } from '~/components/forms/FormAsyncSelect';
import { FormCreateableSelect } from '~/components/forms/FormCreateableSelect';
import { FormTextArea } from '~/components/forms/FormTextArea';
import { FormDropzone } from '~/components/forms/FormDropzone';
import { Asterisk } from '~/components/forms/Asterisk/Asterisk';

export type FormType = 'text' | 'select' | 'textarea' | 'createable-select';

export interface FormRowPropsBase {
  label: string;
  formId: string;
  type?: FormType;
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
      customClassName: 'form-row_form-component',
      ...rest
    };
    if (type == 'text') return <FormTextInput {...component_props} />;
    else if (type == 'textarea') return <FormTextArea {...component_props} />;
    else if (type == 'select') return <FormAsyncSelect {...component_props} />;
    else if (type == 'createable-select') return <FormCreateableSelect {...component_props} />;
    else if (type == 'dropzone') return <FormDropzone {...component_props} />;
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
  margin: ${MARGINS.small};
  align-items: flex-start;

  > div {
    display: flex;

    label {
      margin-top: 10px;
    }

    &:first-child {
      width: 40%;
    }
    &:nth-child(2) {
      width: 60%;
    }
  }

  .form-row_form-component {
    box-shadow: none;
    transition: box-shadow 0.15s ease-in-out;

    &--active:not(div) {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary};
      &--error {
        box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.error};
      }
    }

    &:hover:not(div) {
      box-shadow: 0 0 0.15rem ${({ theme }) => theme.colors.primary};
      transition: box-shadow 0.15s ease-in;
      &--error {
        box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.error};
      }
    }
  }

  .form-row_form-component,
  .form-row_form-component--active {
    width: 100%;
    ::placeholder {
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;
