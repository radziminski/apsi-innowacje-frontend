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
import { CreateIdeaFormFields, schema } from '~/pages/dashboard/create-idea/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectOption } from '~/components/forms';
import { IdeaRequestPendingModal } from '~/pages/dashboard/create-idea/components/IdeaRequestPendingModal';
import apiClient, { SubjectDto, SubjectDtoAudienceEnum } from '~/api-client';
import { AxiosResponse } from 'axios';
import { formSchemaToIdeaDTO } from '~/pages/dashboard/create-idea/util';
import { components } from 'react-select';
import { toast } from 'react-toastify';

export interface CreateIdeaFormSchema {
  [CreateIdeaFormFields.title]: string;
  [CreateIdeaFormFields.anonymous]: boolean;
  [CreateIdeaFormFields.subject]: SelectOption;
  [CreateIdeaFormFields.keywords]: SelectOption[];
  [CreateIdeaFormFields.description]: string;
  [CreateIdeaFormFields.benefits]: string;
  [CreateIdeaFormFields.costs_from]: number;
  [CreateIdeaFormFields.costs_to]: number;
}

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

type RequestStatus = 'pending' | 'error' | 'success';

const CreateIdeaForm = (props: { className?: string }): JSX.Element => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const currentFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [requestStatus, setRequestStatus] = React.useState<RequestStatus | undefined>(undefined);

  React.useEffect(() => {
    if (requestStatus === 'success') {
      dispatch(clearFiles());
      methods.reset();
      setRequestStatus(undefined);
    } else if (requestStatus === 'error') {
      setRequestStatus(undefined);
    }
  }, [requestStatus]);

  React.useEffect(() => {
    return () => {
      dispatch(clearFiles());
    };
  }, []);

  const toastError = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const onSubmit = React.useCallback(
    async (data: CreateIdeaFormSchema) => {
      // eslint-disable-next-line no-console
      console.log(data);
      if (currentUser && currentUser.id) {
        const ideaDTO = formSchemaToIdeaDTO(data, currentUser.id);
        try {
          setRequestStatus('pending');
          const response: AxiosResponse<number> = await apiClient.saveIdeaUsingPOST(ideaDTO);
          if ([200, 201].includes(response.status)) {
            const ideaId = response.data;
            const attachmentResponses = currentFiles.map((fileEntry: FileEntry) =>
              apiClient.saveAttachmentUsingPOST(ideaId, fileEntry.file)
            );

            Promise.all(attachmentResponses)
              .then(responses => {
                if (!responses.some(r => ![200, 201].includes(r.status))) {
                  setRequestStatus('success');
                  toast.success('Pomysł został zapisany.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  });
                } else {
                  setRequestStatus('error');
                  toastError('Niestety nie udało się zapisać załączników.');
                }
              })
              .catch(() => {
                setRequestStatus('error');
                toastError('Niestety nie udało się zapisać załączników.');
              });
          } else {
            setRequestStatus('error');
            toastError('Wystąpił problem podczas zapisywania posta. Post nie został zapisany.');
          }
        } catch (e) {
          setRequestStatus('error');
          toastError('Wystąpił problem podczas zapisywania posta. Post nie został zapisany.');
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
      <>
        {requestStatus && requestStatus === 'pending' && <IdeaRequestPendingModal />}
        <FormProvider {...methods}>
          <div className={'create-idea-form'}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FlexBox>
                <FormRow
                  label={'Tytuł pomysłu'}
                  formId={CreateIdeaFormFields.title}
                  type={'text'}
                  placeholder={'Krótka nazwa pomysłu (1-100 znaków)'}
                  required
                />
                <FormRow
                  label={'Tematyka pomysłu'}
                  formId={CreateIdeaFormFields.subject}
                  type={'async-select'}
                  placeholder={'Wybierz tematykę pomysłu'}
                  fetchOptions={fetchSubjects}
                  required
                  components={{ Option: CustomSubjectSelectOption }}
                />
                <FormRow
                  label={'Słowa kluczowe'}
                  formId={CreateIdeaFormFields.keywords}
                  type={'createable-select'}
                  placeholder={'Wpisz słowa kluczowe'}
                  required
                />
                <FormRow
                  label={'Opis'}
                  formId={CreateIdeaFormFields.description}
                  type={'textarea'}
                  rows={8}
                  placeholder={'Opowiedz nam o swoim pomyśle. Minimum 30 znaków.'}
                  required
                />
                <FormRow
                  label={'Planowane korzyści'}
                  formId={CreateIdeaFormFields.benefits}
                  type={'textarea'}
                  rows={4}
                  placeholder={'Jakie korzyści może przynieść twój pomysł?'}
                  required
                />
                <FormRow
                  label={'Planowane koszty'}
                  formId={CreateIdeaFormFields.costs_from}
                  customFormComponent={<CreateIdeaValueRangeComponent />}
                  required
                />
                <FormRow label={'Dodaj anonimowo'} formId={CreateIdeaFormFields.anonymous} type={'checkbox'} />
                <FormRow label={'Załączniki'} formId={CreateIdeaFormFields.attachments} type={'dropzone'} />
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
