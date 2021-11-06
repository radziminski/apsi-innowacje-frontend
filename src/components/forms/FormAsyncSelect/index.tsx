import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { customSelectStyles, FormComponentProps, Option } from '~/components/forms';

const FormAsyncSelectBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const { control } = useFormContext();
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
      }, 2000)
    );
  }, []);

  // const handleChange = React.useCallback(() => {
  //   //TODO
  // }, []);

  return (
    <div className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          // <MemoizeFormInput {...methods}>
          <AsyncSelect
            loadOptions={fetchOptions}
            cacheOptions
            defaultOptions
            className={customClassName ? customClassName : ''}
            styles={customSelectStyles}
            noOptionsMessage={() => 'Brak opcji'}
            loadingMessage={() => 'Ładowanie opcji...'}
            {...field}
            {...rest}
          />
          // </MemoizeFormInput>
        )}
      />
    </div>
  );
};

export const FormAsyncSelect = styled(FormAsyncSelectBase)`
  width: 100%;
`;
