import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { FormRow } from '~/components/forms/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, clearFiles, FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { RootState } from '~/store/store';
import { Button } from '~/components/Button';
import { CreateIdeaValueRangeComponent } from './CreateIdeaValueRangeComponent';
import { schema } from '~/pages/dashboard/create-idea-page/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Option } from '~/components/forms';
import { IdeaSavedModal } from '~/pages/dashboard/create-idea-page/components/IdeaSavedModal';
import apiClient from '~/api-client';
import { AxiosResponse } from 'axios';
import { formSchemaToIdeaDTO } from '~/pages/dashboard/create-idea-page/util';
import { IdeaErrorModal } from '~/pages/dashboard/create-idea-page/components/IdeaErrorModal';
import { LoadingModal } from '~/components/Modal/LoadingModal';

export interface CreateIdeaFormSchema {
  anonymous: boolean;
  subjectId: Option;
  keywords: Option[];
  description: string;
  benefits: string;
  costs_from: number;
  costs_to: number;
}

type PostStatus = 'success' | 'error';

const CreateIdeaForm = (props: { className?: string }): JSX.Element => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const currentFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [requestStatus, setRequestStatus] = React.useState<PostStatus | undefined>(undefined);

  const closeIdeaSavedOrErrorModal = React.useCallback(() => {
    if (requestStatus === 'success') {
      dispatch(clearFiles());
    }
    setRequestStatus(undefined);
  }, []);

  React.useEffect(() => {
    setIsLoading(false);
  }, [requestStatus]);

  const onSubmit = React.useCallback(
    async (data: CreateIdeaFormSchema) => {
      if (currentUser && currentUser.id) {
        setIsLoading(true);
        const ideaDTO = formSchemaToIdeaDTO(data, currentUser.id);
        try {
          const response: AxiosResponse<number> = await apiClient.saveIdeaUsingPOST(ideaDTO);
          if ([200, 201].includes(response.status)) {
            const ideaId = response.data;
            const attachmentResponses = currentFiles.map((fileEntry: FileEntry) =>
              apiClient.saveAttachmentUsingPOST(ideaId, fileEntry.file.stream())
            );

            Promise.all(attachmentResponses).then(() => {
              setRequestStatus('success');
            });
          } else {
            // TODO proper error handling
            setRequestStatus('error');
          }
        } catch (e) {
          setRequestStatus('error');
        }
        return;
      }
    },
    [currentFiles, currentUser]
  );

  const onFilesAdded = React.useCallback((addedFiles: File[]) => {
    if (addedFiles.length > 0) {
      dispatch(addFiles(addedFiles));
    }
  }, []);

  const fetchSubjects = React.useCallback((): Promise<Option[]> => {
    // TODO fetch from backend
    return new Promise(resolve =>
      setTimeout(() => {
        const fetchedOptions = [
          { value: '0', label: 'Drugi temat' },
          { value: '1', label: 'Pierwszy temat' },
          { value: '2', label: 'Inne' }
        ];
        resolve(fetchedOptions);
      }, 2000)
    );
  }, []);

  return (
    <div className={props.className}>
      {isLoading && (
        <LoadingModal
          textContent={
            'Trwa zapisywanie pomysłu... Zamiast Loadera dałbym toasta i stan' +
            ' zapisywania trzymał w storze. Ale to TODO.'
          }
        />
      )}
      <>
        {!isLoading && requestStatus === 'success' && <IdeaSavedModal onClose={closeIdeaSavedOrErrorModal} />}
        {!isLoading && requestStatus === 'error' && <IdeaErrorModal onClose={closeIdeaSavedOrErrorModal} />}
        <FormProvider {...methods}>
          <div className={'create-idea-form'}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FlexBox>
                <FormRow label={'Dodaj anonimowo'} formId={'anonymous'} type={'checkbox'} />
                <FormRow
                  label={'Tematyka pomysłu'}
                  formId={'subjectId'}
                  type={'async-select'}
                  placeholder={'Wybierz tematykę pomysłu'}
                  fetchOptions={fetchSubjects}
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
      </>
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
