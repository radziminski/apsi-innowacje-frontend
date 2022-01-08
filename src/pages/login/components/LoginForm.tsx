import React from 'react';
import { FlexBox } from '~/components/Box';
import { useSelector } from '~/store/hooks';
import { FormRow } from '~/components/forms/FormRow';
import { Button } from '~/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { Heading5 } from '~/components/Text';

export interface LoginFormData {
  username: string;
  password: string;
}

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { isError, isLoading } = useSelector(state => state.user);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormRow label="Nazwa Użytkownika" formId={'username'} type={'text'} placeholder={'Nazwa Użytkownika'} />
        <FormRow label="Hasło" formId={'password'} type={'password'} placeholder={'Hasło'} />
        <FlexBox justifyContent="flex-end">
          <Button isLoading={isLoading} type={'submit'} primary text="Zaloguj" />
        </FlexBox>
        {isError && <Heading5 textAlign="center">Something went wrong</Heading5>}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
