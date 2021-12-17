import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { customSelectStyles, FormComponentProps, SelectOption } from '~/components/forms';
import { ErrorLabel } from '~/components/forms/ErrorLabel';

interface FormAsyncSelectProps extends FormComponentProps {
  fetchOptions: () => Promise<SelectOption[]>;
}

const FormAsyncSelectBase = (props: FormAsyncSelectProps) => {
  const { id, className, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const {
    control,
    formState: { errors },
    register
  } = useFormContext();

  const getFilteredOptions = (fetchedOptions: SelectOption[], inputValue: string) => {
    return fetchedOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const fetchOptions = React.useCallback(
    async (inputValue: string) => {
      const fetchedOptions = await props.fetchOptions();
      return new Promise(resolve => resolve(getFilteredOptions(fetchedOptions, inputValue)));
    },
    [props.fetchOptions]
  );

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
      {errors[id] && <ErrorLabel text={errors[id].message} />}
    </div>
  );
};

export const FormAsyncSelect = styled(FormAsyncSelectBase)`
  width: 100%;
`;
