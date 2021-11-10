import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';
import { AiOutlineCheck } from 'react-icons/ai';
import { COLORS } from '~/styles/variables';

const FormCheckboxBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const { control, register } = methods;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const { ref } = register(id);
  const onClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
      setChecked(inputRef.current.checked);
    }
  }, [inputRef.current, checked]);

  return (
    <FlexBox className={className}>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <input
            type={'checkbox'}
            className={'form_input'}
            id={id}
            defaultValue={false}
            {...field}
            ref={e => {
              ref(e);
              inputRef.current = e;
            }}
            {...rest}
          />
        )}
      />
      <div className={`form_checkbox${checked ? '--checked' : ''}`} onClick={onClick}>
        <AiOutlineCheck size={13} color={checked ? COLORS.white : COLORS.gray} />
      </div>
    </FlexBox>
  );
};

export const FormCheckbox = styled(FormCheckboxBase)`
  flex-direction: column;
  .form_input {
    display: none;
  }
  .form_checkbox,
  .form_checkbox--checked {
    box-shadow: 0 0 0.3rem ${({ theme }) => theme.colors.gray}AF;
    transition: box-shadow 0.15s ease-in-out;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 999px;
    margin: 0.8rem 0;
  }

  svg {
    transform: translate(3px, 1px);
  }

  .form_checkbox {
    &:hover,
    &--checked:hover {
      box-shadow: 0 0 0.6rem ${({ theme }) => theme.colors.primary}AF;
    }

    &--checked {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus,
    &--checked:focus {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary}AF;
    }

    &--checked:hover {
      transition: box-shadow 0.15s ease-in;
    }
  }
`;
