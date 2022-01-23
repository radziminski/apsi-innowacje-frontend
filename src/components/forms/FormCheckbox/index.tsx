import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import React from 'react';
import { FormComponentProps } from '~/components/forms';
import { FlexBox } from '~/components/Box';
import { AiOutlineCheck } from 'react-icons/ai';
import { COLORS } from '~/styles/variables';
import { MdClear } from 'react-icons/md';

const Checkbox = styled(
  (props: { checked: boolean; onClick: (e: React.MouseEvent<HTMLDivElement>) => void; className?: string }) => {
    return (
      <div className={props.className} onClick={props.onClick}>
        {props.checked ? <AiOutlineCheck size={13} color={COLORS.white} /> : <MdClear size={13} color={COLORS.gray} />}
      </div>
    );
  }
)`
  box-shadow: 0 0 0.3rem ${({ theme }) => theme.colors.gray}AF;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.primary : theme.colors.white)};
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0.7rem 0;
  transition: box-shadow 0.15s ease-in;

  svg {
    transform: translate(6px, 4px);
  }

  &:hover {
    box-shadow: 0 0 0.6rem ${({ theme }) => theme.colors.primary}AF;
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary}AF;
  }
`;

const FormCheckboxBase = (props: FormComponentProps) => {
  const { id, className, ...rest } = props;
  const methods = useFormContext();
  const { control, register } = methods;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);
  const { ref } = register(id);
  const onDivClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (inputRef.current) {
        inputRef.current.click();
      }
      e.stopPropagation();
    },
    [inputRef.current]
  );

  const onInputClick = React.useCallback(() => {
    if (inputRef.current) {
      setChecked(inputRef.current.checked);
    }
  }, [inputRef.current]);

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
            onClick={onInputClick}
            {...field}
            ref={e => {
              ref(e);
              inputRef.current = e;
            }}
            {...rest}
          />
        )}
      />
      <Checkbox checked={checked} onClick={onDivClick} />
    </FlexBox>
  );
};

export const FormCheckbox = styled(FormCheckboxBase)`
  flex-direction: column;
  .form_input {
    display: none;
  }
`;
