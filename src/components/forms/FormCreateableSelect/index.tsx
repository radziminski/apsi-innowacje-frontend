import { Controller, useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import React from 'react';
import { customSelectStyles, FormComponentProps } from '~/components/forms';
import { useClassNameOnFocus } from '~/hooks/useClassNameOnFocus';

const FormCreateableSelectBase = (props: FormComponentProps) => {
  const { id, className, customClassName, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const classNameSuffix = useClassNameOnFocus('--active', divRef);
  const { control } = useFormContext();

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
            className={`${customClassName ? customClassName + classNameSuffix : ''}`}
            styles={customSelectStyles}
            {...field}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export const FormCreateableSelect = styled(FormCreateableSelectBase)`
  width: 100%;
`;
