import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { customSelectStyles, FormComponentProps, Option } from '~/components/forms';

export interface FormSelectProps extends FormComponentProps {
  options: Option[];
}

// Not needed now, but since I already created it, let it sit here
const FormSelectBase = (props: FormComponentProps) => {
  const { id, options, customClassName, className, ...rest } = props;
  const { control } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select {...{ options }} className={customClassName || ''} styles={customSelectStyles} {...field} {...rest} />
        )}
      />
    </div>
  );
};

export const FormSelect = styled(FormSelectBase)`
  width: 100%;
`;