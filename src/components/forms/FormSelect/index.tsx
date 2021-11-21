import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { customSelectStyles, FormComponentProps, SelectOption } from '~/components/forms';

export interface FormSelectProps extends FormComponentProps {
  options: SelectOption[];
}

// Not needed now, but since I already created it, let it sit here
const FormSelectBase = (props: FormSelectProps) => {
  const { id, options, customClassName, className, ...rest } = props;
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
          <Select
            {...{ options }}
            className={customClassName || ''}
            styles={customSelectStyles(!!errors[id])}
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

export const FormSelect = styled(FormSelectBase)`
  width: 100%;
  p {
    margin-top: 5px;
  }
`;
