import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import React from 'react';
import { FormInputProps } from '~/components/forms';
import { MARGINS } from '~/styles/variables';

const FormCreateableSelectBase = (props: FormInputProps) => {
  const { id, className, ...rest } = props;
  const { control } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => <CreatableSelect isMulti {...field} {...rest} isClearable={false} />}
      />
    </div>
  );
};

export const FormCreateableSelect = styled(FormCreateableSelectBase)`
  width: 100%;
  margin: 0 ${MARGINS.small};
`;
