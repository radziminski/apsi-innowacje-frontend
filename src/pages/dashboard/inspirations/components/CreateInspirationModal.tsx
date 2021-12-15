import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { image, link } from 'suneditor/src/plugins';
import { CloseCreateInspirationModalPrompt } from './CloseCreateInspirationModalPrompt';
import { Modal } from '~/components/Modal';
import { Button } from '~/components/Button';
import { CenteredLoader } from '~/components/Loader';
import { FormDropzone } from '~/components/forms/FormDropzone';

require('suneditor/dist/css/suneditor.min.css');

interface CreateInspirationModalProps {
  closeModal: () => void;
  className?: string;
}

const CreateInspirationModalBase = (props: CreateInspirationModalProps) => {
  const [promptModalVisible, setPromptModalVisible] = React.useState<boolean>(false);
  const editorContent = React.useRef('');
  const promptCloseModal = React.useCallback(() => {
    setPromptModalVisible(true);
  }, []);
  const exitCreation = React.useCallback(
    (exitCreation: boolean) => {
      setPromptModalVisible(false);
      exitCreation && props.closeModal();
    },
    [props.closeModal]
  );

  const submitForm = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(editorContent);
  }, []);

  const SunEditor = React.lazy(() => import('suneditor-react'));

  return (
    <Modal
      textContent={
        <div>
          <Center className={props.className}>
            <Suspense fallback={<CenteredLoader />}>
              <SunEditor
                placeholder="Wpisz treść inspiracji..."
                setOptions={{
                  height: '200',
                  width: '60vw',
                  plugins: [image, link],
                  buttonList: [['undo', 'redo', 'image', 'link']]
                }}
                lang={'pl'}
                onChange={content => {
                  editorContent.current = content;
                }}
              />
            </Suspense>
            <FormDropzone id={'create-inspiration__dropzone'} />
            <FlexBox className={'create-inspiration__buttons'}>
              <Button text={'Wyślij'} primary onClick={submitForm} />
              <Button text={'Anuluj'} onClick={promptCloseModal} />
            </FlexBox>
          </Center>
          {promptModalVisible && <CloseCreateInspirationModalPrompt closeModal={exitCreation} />}
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

  #create-inspiration__dropzone {
    margin-top: ${({ theme }) => theme.spacing.m};
    .inno-modal {
      height: 100%;
    }
  }
`;
