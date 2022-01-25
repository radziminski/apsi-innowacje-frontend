import React from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { CloseCreateInspirationModalPrompt } from './CloseCreateInspirationModalPrompt';
import { Modal } from '~/components/Modal';
import { Button } from '~/components/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '~/pages/dashboard/inspirations/create-inspiration/schema';
import { ContentEditor } from '~/pages/dashboard/inspirations/create-inspiration/components/ContentEditor';
import { Heading3 } from '~/components/Text';
import { AxiosResponse } from 'axios';
import apiClient, { CreatePostDto } from '~/api-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { FormRow } from '~/components/forms/FormRow';
import { toast } from 'react-toastify';
import { RequestStatus } from '~/constants/constants';
import { InspirationRequestPendingModal } from './InspirationRequestPendingModal';
import { getSingleInspiration } from '~/store/slices/CreateInspirationsSlice';

require('suneditor/dist/css/suneditor.min.css');

interface CreateInspirationModalProps {
  closeSelf: () => void;
  className?: string;
}

export interface CreateInspirationFormSchema {
  title: string;
  content: string;
}

const CreateInspirationModalBase = (props: CreateInspirationModalProps) => {
  const [promptModalVisible, setPromptModalVisible] = React.useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [requestStatus, setRequestStatus] = React.useState<RequestStatus | undefined>(undefined);
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();

  const promptCloseModal = React.useCallback(() => {
    setPromptModalVisible(true);
  }, []);

  const exitCreationHandleAnswer = React.useCallback(
    (exitCreation: boolean) => {
      setPromptModalVisible(false);
      exitCreation && props.closeSelf();
    },
    [props.closeSelf]
  );

  React.useEffect(() => {
    if (requestStatus === 'success') {
      setRequestStatus(undefined);
      props.closeSelf();
    }
  }, [requestStatus, props.closeSelf]);

  const toastError = () => {
    toast.error('Wystąpił problem podczas zapisywania inspiracji i nie została ona zapisana.', {
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
    async (data: CreateInspirationFormSchema) => {
      // eslint-disable-next-line no-console
      if (currentUser && currentUser.id) {
        const formData = {
          title: data.title,
          text: data.content
        } as CreatePostDto;
        setRequestStatus('pending');
        try {
          const response: AxiosResponse<number> = await apiClient.postCreatePostPost(formData);
          if ([200, 201].includes(response.status)) {
            toast.success('Inspiracja została zapisana.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
            setRequestStatus('success');
            const inspirationId = response.data;
            dispatch(getSingleInspiration(inspirationId));
          } else {
            setRequestStatus('error');
            toastError();
          }
        } catch (e) {
          setRequestStatus('error');
          toastError();
        }
        return;
      }
    },
    [currentUser]
  );

  return (
    <Modal
      content={
        <FlexBox className={props.className}>
          {requestStatus && requestStatus === 'pending' && <InspirationRequestPendingModal />}
          <FormProvider {...methods}>
            <Center>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Heading3 fontSize="1.4rem" fontWeight={500}>
                  Stwórz inspirację
                </Heading3>
                <FormRow
                  type={'text'}
                  label={'Tytuł'}
                  formId={'title'}
                  inputWidth={'90%'}
                  labelWidth={'10%'}
                  maxLength="100"
                  required
                />
                <ContentEditor id={'content'} />
                <FlexBox className={'create-inspiration__buttons'}>
                  <Button text={'Anuluj'} type={'button'} onClick={promptCloseModal} />
                  <Button text={'Wyślij'} type={'submit'} primary />
                </FlexBox>
              </form>
            </Center>
            {promptModalVisible && <CloseCreateInspirationModalPrompt closeModal={exitCreationHandleAnswer} />}
          </FormProvider>
        </FlexBox>
      }
    />
  );
};

export const CreateInspirationModal = styled(CreateInspirationModalBase)`
  .create-inspiration__buttons {
    width: 100%;
    justify-content: flex-end;
  }

  h3 {
    align-self: flex-start;
  }
`;
