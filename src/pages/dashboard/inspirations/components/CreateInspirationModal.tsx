import React from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import SunEditor from 'suneditor-react';
import { image, link } from 'suneditor/src/plugins';
import { CloseCreateInspirationModalPrompt } from './CloseCreateInspirationModalPrompt';
import { Modal } from '~/components/Modal';
import { Button } from '~/components/Button';
require('suneditor/dist/css/suneditor.min.css');

interface CreateInspirationModalProps {
  closeModal: () => void;
  className?: string;
}

const CreateInspirationModalBase = (props: CreateInspirationModalProps) => {
  const modalRef = React.createRef<HTMLDivElement>();
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
  useOutsideClick(modalRef, promptCloseModal);

  return (
    <Modal
      ref={modalRef}
      textContent={
        <div>
          <Center className={props.className}>
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
`;
