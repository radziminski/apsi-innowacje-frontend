import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import FormRow from '~/pages/dashboard/create-idea-page/components/FormRow';

const SubmitButtonBase = (props: { className?: string }): JSX.Element => {
  return (
    <button type={'submit'} className={props.className}>
      Wyślij
    </button>
  );
};

const SubmitButton = styled(SubmitButtonBase)`
  background-color: #eee;
  padding: 15px;
`;

const CreateIdeaForm = (props: { className?: string }): JSX.Element => {
  const methods = useForm();

  const onSubmit = React.useCallback(data => {
    // eslint-disable-next-line no-console
    console.log(data);
    return;
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FlexBox className={props.className}>
          <FormRow label={'Tytuł pomysłu'} formId={'title'} type={'text'} />
          <FormRow label={'Opis'} formId={'description'} type={'textarea'} />
          <FormRow label={'Słowa kluczowe'} formId={'keywords'} type={'text'} />
          <FormRow label={'Planowane korzyści'} formId={'benefits'} type={'text'} />
          <FormRow label={'Planowane koszty'} formId={'costs'} type={'text'} />
          <FormRow label={'Załączniki'} formId={'attachments'} type={'text'} />
        </FlexBox>
        <SubmitButton />
      </form>
    </FormProvider>
  );
};

export default styled(CreateIdeaForm)`
  flex-direction: column;
`;
