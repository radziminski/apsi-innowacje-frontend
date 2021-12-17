import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { FormRow } from '~/components/forms/FormRow';
import { useDispatch, useSelector } from 'react-redux';
import { clearFiles, FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { RootState } from '~/store/store';
import { Button } from '~/components/Button';
import { CreateIdeaValueRangeComponent } from './CreateIdeaValueRangeComponent';
import { schema } from '~/pages/dashboard/create-idea/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectOption } from '~/components/forms';
import { IdeaSavedModal } from '~/pages/dashboard/create-idea/components/IdeaSavedModal';
import apiClient, { SubjectDto, SubjectDtoAudienceEnum } from '~/api-client';
import { AxiosResponse } from 'axios';
import { formSchemaToIdeaDTO } from '~/pages/dashboard/create-idea/util';
import { IdeaErrorModal } from '~/pages/dashboard/create-idea/components/IdeaErrorModal';
import { LoadingModal } from '~/components/Modal/LoadingModal';
import { components } from 'react-select';

export interface CreateIdeaFormSchema {
  anonymous: boolean;
  subjectId: SelectOption;
  keywords: SelectOption[];
  description: string;
  benefits: string;
  costs_from: number;
  costs_to: number;
}

type PostStatus = 'success' | 'error';

export const CustomSubjectSelectOption = ({ innerRef, innerProps, ...restProps }) => {
  return (
    <div ref={innerRef} {...innerProps}>
      <components.Option {...innerProps} {...restProps} getStyles={() => restProps.getStyles('option', restProps)}>
        <span>{restProps.data.label}</span>
        <br />
        <span style={{ fontSize: '12px' }}>Grupa docelowa: {restProps.data.details}</span>
      </components.Option>
      {restProps.value !== restProps.options[restProps.options.length - 1].value && (
        <div style={{ borderBottom: 'solid 1px rgba(0, 0, 0, 0.2)', height: '1px', margin: '0 5px' }} />
      )}
    </div>
  );
};

function subjectDTOAudienceToSelectText(
  audience:
    | SubjectDtoAudienceEnum.Student
    | SubjectDtoAudienceEnum.Employee
    | SubjectDtoAudienceEnum.Committee
    | SubjectDtoAudienceEnum.Admin
    | null
    | undefined
): string {
  switch (audience) {
    case SubjectDtoAudienceEnum.Student:
      return 'Studenci';
    case SubjectDtoAudienceEnum.Employee:
      return 'Wykładowcy';
    case SubjectDtoAudienceEnum.Committee:
      return 'Komisja';
    case SubjectDtoAudienceEnum.Admin:
      return 'Administratorzy';
  }
  return 'Nieznana';
}

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
              setIsLoading(false);
            });
          } else {
            // TODO proper error handling
            setRequestStatus('error');
            setIsLoading(false);
          }
        } catch (e) {
          setRequestStatus('error');
          setIsLoading(false);
        }
        return;
      }
    },
    [currentFiles, currentUser]
  );

  const fetchSubjects = React.useCallback(async (): Promise<SelectOption[]> => {
    const fetchedSubjects: SubjectDto[] = (await apiClient.getAllSubjectsUsingGET()).data;

    return fetchedSubjects.map(subject => ({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: `${subject.id!}`,
      label: subject.name ?? 'Nieznany',
      details: subjectDTOAudienceToSelectText(subject.audience)
    }));
  }, []);

  return (
    <div className={props.className}>
      {/*TODO Use react-toastify to notify about adding and do it in the background*/}
      {isLoading && <LoadingModal textContent={'Trwa zapisywanie pomysłu...'} />}
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
                  components={{ Option: CustomSubjectSelectOption }}
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
                <FormRow label={'Załączniki'} formId={'attachments'} type={'dropzone'} />
              </FlexBox>
              <FlexBox className={'create-idea-form__submit-button'}>
                <Button type={'submit'} text={'Wyślij'} primary />
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
    margin: ${({ theme }) => theme.spacing.s};

    @media ${({ theme }) => theme.mediaQueries.mobile} {
      margin: 0;
    }

    > form > div {
      flex-direction: column;
    }

    .create-idea-form__submit-button {
      align-items: flex-end;
      margin-top: ${({ theme }) => theme.spacing.s};
      margin-right: ${({ theme }) => theme.spacing.s};
    }
  }
`;
