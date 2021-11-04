import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import FormRow from '~/components/forms/FormRow';
import { MARGINS } from '~/styles/variables';

const SubmitButtonBase = (props: { className?: string }): JSX.Element => {
  return (
    <div className={props.className}>
      <button type={'submit'}>Wyślij</button>
    </div>
  );
};

const SubmitButton = styled(SubmitButtonBase)`
  text-align: right;
  button {
    background-color: #eee;
    border-radius: 999px;
    margin: ${MARGINS.medium};
    padding: ${MARGINS.small} ${MARGINS.medium};
  }
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
      <div className={props.className}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FlexBox>
            <FormRow label={'Tematyka pomysłu'} formId={'topic'} type={'select'} />
            <FormRow label={'Słowa kluczowe'} formId={'keywords'} type={'createable-select'} />
            <FormRow
              label={'Opis'}
              formId={'description'}
              type={'textarea'}
              rows={8}
              placeholder={'Opowiedz nam o swoim pomyśle'}
            />
            <FormRow
              label={'Planowane korzyści'}
              formId={'benefits'}
              type={'textarea'}
              rows={4}
              placeholder={'Jakie korzyści może przynieść twój pomysł?'}
            />
            <FormRow
              label={'Planowane koszty'}
              formId={'costs'}
              type={'text'}
              placeholder={'Tu jakieś ranges do wyboru pewnie'}
            />
            <FormRow
              label={'Załączniki'}
              formId={'attachments'}
              type={'text'}
              placeholder={'Tu jakiś dropzone + możliwość kliknięcia z otwarciem eksploratora'}
            />
          </FlexBox>
          <SubmitButton />
        </form>
      </div>
    </FormProvider>
  );
};

export default styled(CreateIdeaForm)`
  margin: ${MARGINS.small};

  > form > div {
    flex-direction: column;
  }

  textarea {
    border-radius: 1.5rem;
  }
`;
