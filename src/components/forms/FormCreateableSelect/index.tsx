import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import React from 'react';
import { customSelectStyles, FormComponentProps } from '~/components/forms';
import { ErrorLabel } from '~/components/forms/ErrorLabel';

const FormCreateableSelectBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const {
    control,
    formState: { errors },
    register
  } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            isMulti
            noOptionsMessage={() => 'Wpisz słowo by je dodać'}
            formatCreateLabel={(inputValue: string) => `Dodaj "${inputValue}"`}
            isClearable={false}
            styles={customSelectStyles(!!errors[id])}
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

export const FormCreateableSelect = styled(FormCreateableSelectBase)`
  width: 100%;
`;
