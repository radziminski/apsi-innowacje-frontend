import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { FormRow } from '~/components/forms/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { RootState } from '~/store/store';
import { Button } from '~/components/Button';
import { CreateIdeaValueRangeComponent } from './CreateIdeaValueRangeComponent';
import { schema } from '~/pages/dashboard/create-idea-page/schema';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateIdeaForm = (props: { className?: string }): JSX.Element => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const currentFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);

  const onSubmit = React.useCallback(
    data => {
      // eslint-disable-next-line no-console
      console.log(data);
      currentFiles.map((fileEntry: FileEntry) => {
        // eslint-disable-next-line no-console
        console.log(fileEntry.file.name);
      });
      return;
    },
    [currentFiles]
  );

  const onFilesAdded = React.useCallback((addedFiles: File[]) => {
    if (addedFiles.length > 0) {
      dispatch(addFiles(addedFiles));
    }
  }, []);

  return (
    <div className={props.className}>
      <FormProvider {...methods}>
        <div className={'create-idea-form'}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FlexBox>
              <FormRow
                label={'Tematyka pomysłu'}
                formId={'topic'}
                type={'select'}
                placeholder={'Wybierz tematykę pomysłu'}
                required
              />
              <FormRow
                label={'Słowa kluczowe'}
                formId={'keywords'}
                type={'createable-select'}
                placeholder={'Wpisz słowa kluczowe'}
                required
              />
              <FormRow
                label={'Opis'}
                formId={'description'}
                type={'textarea'}
                rows={8}
                placeholder={'Opowiedz nam o swoim pomyśle. Minimum 30 znaków.'}
                required
              />
              <FormRow
                label={'Planowane korzyści'}
                formId={'benefits'}
                type={'textarea'}
                rows={4}
                placeholder={'Jakie korzyści może przynieść twój pomysł?'}
                required
              />
              <FormRow
                label={'Planowane koszty'}
                formId={'costs_from'}
                customFormComponent={<CreateIdeaValueRangeComponent />}
                required
              />
              <FormRow label={'Załączniki'} formId={'attachments'} type={'dropzone'} onFilesAdded={onFilesAdded} />
            </FlexBox>
            <FlexBox className={'create-idea-form__submit-button'}>
              <Button type={'submit'} text={'Wyślij'} />
            </FlexBox>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default styled(CreateIdeaForm)`
  .create-idea-form {
    margin: ${({ theme }) => theme.margins.small};

    > form > div {
      flex-direction: column;
    }

    .create-idea-form__submit-button {
      align-items: flex-end;
      margin-right: ${({ theme }) => theme.margins.small};
      margin-top: ${({ theme }) => theme.margins.small};
    }
  }
`;
