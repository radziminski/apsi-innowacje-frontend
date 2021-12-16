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
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { InspirationSavedModal } from './InspirationSavedModal';
import { FormRow } from '~/components/forms/FormRow';

require('suneditor/dist/css/suneditor.min.css');

interface CreateInspirationModalProps {
  closeSelf: () => void;
  className?: string;
}

export interface CreateInspirationFormSchema {
  title: string;
  content: string;
}

type PostStatus = 'success' | 'error';

const CreateInspirationModalBase = (props: CreateInspirationModalProps) => {
  const [promptModalVisible, setPromptModalVisible] = React.useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [requestStatus, setRequestStatus] = React.useState<PostStatus | undefined>(undefined);
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const promptCloseModal = React.useCallback(() => {
    setPromptModalVisible(true);
  }, []);

  const exitCreation = React.useCallback(
    (exitCreation: boolean) => {
      setPromptModalVisible(false);
      exitCreation && props.closeSelf();
    },
    [props.closeSelf]
  );

  const closeInspirationSavedOrErrorModal = React.useCallback(() => {
    if (requestStatus === 'success') {
      props.closeSelf();
    }
    setRequestStatus(undefined);
  }, [requestStatus, props.closeSelf]);

  const onSubmit = React.useCallback(
    async (data: CreateInspirationFormSchema) => {
      // eslint-disable-next-line no-console
      if (currentUser && currentUser.id) {
        setIsLoading(true);
        const formData = {
          title: data.title,
          text: data.content
        } as CreatePostDto;
        try {
          const response: AxiosResponse<number> = await apiClient.postCreatePostPost(formData);
          if ([200, 201].includes(response.status)) {
            setRequestStatus('success');
            setIsLoading(false);
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
    [currentUser]
  );

  return (
    <Modal
      textContent={
        <div>
          <FormProvider {...methods}>
            <Center className={props.className}>
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
                  required
                />
                <ContentEditor id={'content'} />
                <FlexBox className={'create-inspiration__buttons'}>
                  <Button text={'Wyślij'} type={'submit'} primary />
                  <Button text={'Anuluj'} onClick={promptCloseModal} />
                </FlexBox>
              </form>
            </Center>
            {promptModalVisible && <CloseCreateInspirationModalPrompt closeModal={exitCreation} />}
            {!isLoading && requestStatus === 'success' && (
              <InspirationSavedModal onClose={closeInspirationSavedOrErrorModal} />
            )}
          </FormProvider>
        </div>
      }
    />
  );
};

export const CreateInspirationModal = styled(CreateInspirationModalBase)`
  flex-direction: column;
  .create-inspiration__buttons {
    width: 100%;
    justify-content: flex-end;
  }

  h3 {
    align-self: flex-start;
  }
`;
