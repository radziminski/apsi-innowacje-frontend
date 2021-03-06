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
import apiClient, { SubjectDto } from '~/api-client';
import { AxiosResponse } from 'axios';
import { formSchemaToIdeaDTO } from '~/pages/dashboard/create-idea/util';
import { components } from 'react-select';
import { toast } from 'react-toastify';
import { RequestStatus } from '~/constants/constants';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';
import { subjectDTOAudienceToSelectText } from '~/utils/utils';

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

  const onSubmit = React.useCallback(
    async (data: CreateIdeaFormSchema) => {
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
                  toast.success('Pomys?? zosta?? zapisany.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  });
                  dispatch(getIdeas());
                } else {
                  setRequestStatus('error');
                  toast.error('Niestety nie uda??o si?? zapisa?? za????cznik??w.');
                }
              })
              .catch(() => {
                setRequestStatus('error');
                toast.error('Niestety nie uda??o si?? zapisa?? za????cznik??w.');
              });
          } else {
            setRequestStatus('error');
            toast.error('Wyst??pi?? problem podczas zapisywania posta. Post nie zosta?? zapisany.');
          }
        } catch (e) {
          setRequestStatus('error');
          toast.error('Wyst??pi?? problem podczas zapisywania posta. Post nie zosta?? zapisany.');
        }
        return;
      }
    },
    [currentFiles, currentUser]
  );

  const fetchSubjects = React.useCallback(async (): Promise<SelectOption[]> => {
    const response = await apiClient.getAllSubjectsUsingGET();
    if (response.status === 200) {
      const fetchedSubjects: SubjectDto[] = response.data;

      const mappedSubjects = fetchedSubjects
        .filter(subject => !subject.done)
        .map(subject => ({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          value: `${subject.id!}`,
          label: subject.name ?? 'Nieznany',
          details: subjectDTOAudienceToSelectText(subject.audience)
        }));

      const otherSubject = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: null as any,
        label: 'Inne',
        details: 'Wszyscy'
      };

      return [...mappedSubjects, otherSubject];
    } else {
      toast.error('Wyst??pi?? problem podczas pobierania temat??w.');
      return [];
    }
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
                  label={'Tytu?? pomys??u'}
                  formId={CreateIdeaFormFields.title}
                  type={'text'}
                  placeholder={'Kr??tka nazwa pomys??u (1-100 znak??w)'}
                  required
                />
                <FormRow
                  label={'Tematyka pomys??u'}
                  formId={CreateIdeaFormFields.subject}
                  type={'async-select'}
                  placeholder={'Wybierz tematyk?? pomys??u'}
                  fetchOptions={fetchSubjects}
                  required
                  components={{ Option: CustomSubjectSelectOption }}
                />
                <FormRow
                  label={'S??owa kluczowe'}
                  formId={CreateIdeaFormFields.keywords}
                  type={'createable-select'}
                  placeholder={'Wpisz s??owa kluczowe'}
                  required
                />
                <FormRow
                  label={'Opis'}
                  formId={CreateIdeaFormFields.description}
                  type={'textarea'}
                  rows={8}
                  placeholder={'Opowiedz nam o swoim pomy??le. Minimum 30 znak??w.'}
                  required
                />
                <FormRow
                  label={'Planowane korzy??ci'}
                  formId={CreateIdeaFormFields.benefits}
                  type={'textarea'}
                  rows={4}
                  placeholder={'Jakie korzy??ci mo??e przynie???? tw??j pomys???'}
                  required
                />
                <FormRow
                  label={'Planowane koszty'}
                  formId={CreateIdeaFormFields.costs_from}
                  customFormComponent={<CreateIdeaValueRangeComponent />}
                  required
                />
                <FormRow label={'Dodaj anonimowo'} formId={CreateIdeaFormFields.anonymous} type={'checkbox'} />
                <FormRow label={'Za????czniki'} formId={CreateIdeaFormFields.attachments} type={'dropzone'} />
              </FlexBox>
              <FlexBox className={'create-idea-form__submit-button'}>
                <Button type={'submit'} text={'Wy??lij'} primary />
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
    max-width: 1000px;
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
