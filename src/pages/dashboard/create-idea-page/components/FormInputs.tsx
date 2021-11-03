import React from 'react';
import { MemoizeFormInput } from '~/pages/dashboard/create-idea-page/util/MemoizeFormInput';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { MARGINS } from '~/styles/variables';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';

export interface FormInputPropsBase {
  id: string;
  className?: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormInputProps = FormInputPropsBase & any;

const FormTextInputBase = (props: FormInputProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  return (
    <MemoizeFormInput {...methods}>
      <input {...methods.register(id)} type={'text'} className={className} id={id} {...rest} />
    </MemoizeFormInput>
  );
};

const FormTextAreaInputBase = (props: FormInputProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();

  return (
    <MemoizeFormInput {...methods}>
      <textarea {...methods.register(id)} maxLength={1000} className={className} id={id} {...rest} />
    </MemoizeFormInput>
  );
};

interface Option {
  label: string;
  value: string;
}

const FormSelectInputBase = (props: FormInputProps & { createable: boolean }) => {
  const { id, className, ...rest } = props;
  const { control } = useFormContext();
  // const [options, setOptions] = React.useState([] as Option[]);
  const getFilteredOptions = (fetchedOptions: Option[], inputValue: string) => {
    return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const fetchOptions = React.useCallback((inputValue: string) => {
    // TODO fetch from backend
    return new Promise(resolve =>
      setTimeout(() => {
        const fetchedOptions = [
          { value: 'first_topic', label: 'Drugi temat' },
          { value: 'second_topic', label: 'Pierwszy temat' },
          { value: 'other', label: 'Inne' }
        ];
        resolve(getFilteredOptions(fetchedOptions, inputValue));
      }, 1000)
    );
  }, []);

  const handleChange = React.useCallback(() => {
    //TODO
  }, []);

  return props.createable ? (
    <Controller
      name={id}
      control={control}
      render={() => (
        <AsyncCreatableSelect isMulti cacheOptions defaultOptions loadOptions={fetchOptions} onChange={handleChange} />
      )}
    />
  ) : (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        // <MemoizeFormInput {...methods}>
        <AsyncSelect
          loadOptions={fetchOptions}
          cacheOptions
          defaultOptions
          {...field}
          className={className}
          id={id}
          {...rest}
        />
        // </MemoizeFormInput>
      )}
    />
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

export const FormSelectInput = styled(FormSelectInputBase)``;
