import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import React from 'react';
import { customSelectStyles, FormComponentProps } from '~/components/forms';

const FormCreateableSelectBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const { control } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            isMulti
            {...field}
            {...rest}
            noOptionsMessage={() => 'Wpisz słowo by je dodać'}
            formatCreateLabel={(inputValue: string) => `Dodaj "${inputValue}"`}
            isClearable={false}
            className={customClassName}
            styles={customSelectStyles}
          />
        )}
      />
    </div>
  );
};

export const FormCreateableSelect = styled(FormCreateableSelectBase)`
  width: 100%;
`;
