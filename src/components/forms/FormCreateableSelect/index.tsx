import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import React from 'react';
import { customSelectStyles, FormComponentProps } from '~/components/forms';

const FormCreateableSelectBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <div className={className} ref={divRef}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            isMulti
            noOptionsMessage={() => 'Wpisz słowo by je dodać'}
            formatCreateLabel={(inputValue: string) => `Dodaj "${inputValue}"`}
            isClearable={false}
            className={`${customClassName ? customClassName + (errors[id] ? '--error' : '') : ''}`}
            styles={customSelectStyles(!!errors[id])}
            {...field}
            {...rest}
          />
        )}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </div>
  );
};

export const FormCreateableSelect = styled(FormCreateableSelectBase)`
  width: 100%;
  p {
    margin-top: 5px;
  }
`;
