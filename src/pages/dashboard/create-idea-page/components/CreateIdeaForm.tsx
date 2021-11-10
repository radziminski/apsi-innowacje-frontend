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
import { Option } from '~/components/forms';

const AUDIENCE_OPTIONS = [
  { value: 'lecturers', label: 'Wykładowcy' },
  { value: 'Students', label: 'Studenci' },
  { value: 'All', label: 'Wszyscy' }
];

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

  const fetchTopics = React.useCallback((): Promise<Option[]> => {
    // TODO fetch from backend
    return new Promise(resolve =>
      setTimeout(() => {
        const fetchedOptions = [
          { value: 'first_topic', label: 'Drugi temat' },
          { value: 'second_topic', label: 'Pierwszy temat' },
          { value: 'other', label: 'Inne' }
        ];
        resolve(fetchedOptions);
      }, 2000)
    );
  }, []);

  return (
    <div className={props.className}>
      <FormProvider {...methods}>
        <div className={'create-idea-form'}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FlexBox>
              <FormRow label={'Dodaj anonimowo'} formId={'isAnonymous'} type={'checkbox'} />
              <FormRow
                label={'Tematyka pomysłu'}
                formId={'topic'}
                type={'async-select'}
                placeholder={'Wybierz tematykę pomysłu'}
                fetchOptions={fetchTopics}
                required
              />
              <FormRow
                label={'Grupa odbiorców'}
                formId={'audience'}
                type={'select'}
                options={AUDIENCE_OPTIONS}
                placeholder={'Wybierz grupę odbiorców'}
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
