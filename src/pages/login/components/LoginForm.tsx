/* eslint-disable */
import React from 'react';
import { Center, FlexBox } from '~/components/Box';
import { useSelector } from '~/store/hooks';
import { FormRow } from '~/components/forms/FormRow';
import { Button } from '~/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Logo from '~/components/Logo';
import styled from 'styled-components';

export interface formData {
  username: string;
  password: string;
}

interface Props {
  onSubmit: (data: formData) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { isError, isLoading } = useSelector(state => state.user);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormRow label="Nazwa Uzytkownika" formId={'username'} type={'text'} placeholder={'Nazwa Uzytkownika'} />
        <FormRow label="Haslo" formId={'password'} type={'password'} placeholder={'Haslo'} />
        <FlexBox justifyContent="flex-end">
          <Button type={'submit'} text={'Zaloguj'} width="20%" />
        </FlexBox>
        {isError && <h5>ERROR!!!</h5>}
        {isLoading && <h5>Loading....</h5>}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
