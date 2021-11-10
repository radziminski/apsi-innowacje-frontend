import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { customSelectStyles, FormComponentProps, Option } from '~/components/forms';

const FormAsyncSelectBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const {
    control,
    formState: { errors },
    register
  } = useFormContext();

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
    <div className={className} ref={divRef}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <AsyncSelect
            loadOptions={fetchOptions}
            cacheOptions
            defaultOptions
            styles={customSelectStyles(!!errors[id])}
            noOptionsMessage={() => 'Brak opcji'}
            loadingMessage={() => 'Ładowanie opcji...'}
            {...register(id)}
            {...field}
            {...rest}
          />
        )}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </div>
  );
};

export const FormAsyncSelect = styled(FormAsyncSelectBase)`
  width: 100%;
  p {
    margin-top: 5px;
  }
`;
