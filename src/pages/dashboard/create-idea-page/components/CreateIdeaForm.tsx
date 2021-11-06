import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { FormRow } from '~/components/forms/FormRow';
import { COLORS, MARGINS } from '~/styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { addFiles, FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { RootState } from '~/store/store';
import { ModalOverlay } from '~/components/ModalOverlay';
import { ModalWindow } from '~/components/ModalWindow';
import { DuplicatedEntriesModal } from '~/pages/dashboard/create-idea-page/components/DuplicatedEntriesModal';

const SubmitButtonBase = (props: { className?: string }): JSX.Element => {
  return (
    <div className={props.className}>
      <button type={'submit'}>Wyślij</button>
    </div>
  );
};

const SubmitButton = styled(SubmitButtonBase)`
  text-align: right;
  button {
    background-color: ${COLORS.lightGray};
    border-radius: 999px;
    margin: ${MARGINS.small};
    padding: ${MARGINS.small} ${MARGINS.medium};
    &:hover {
      background-color: ${COLORS.primary};
    }
    &:active {
      background-color: ${COLORS.accent3};
    }
  }

  button,
  button:active,
  button:hover {
    transition: background-color 0.2s ease-in-out;
  }
`;

const CreateIdeaForm = (props: { className?: string }): JSX.Element => {
  const methods = useForm();
  const dispatch = useDispatch();
  const currentFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);
  const duplicatedEntriesError = useSelector((state: RootState) => state.addedFiles.duplicationError);
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
              />
              <FormRow
                label={'Słowa kluczowe'}
                formId={'keywords'}
                type={'createable-select'}
                placeholder={'Wpisz słowa kluczowe'}
              />
              <FormRow
                label={'Opis'}
                formId={'description'}
                type={'textarea'}
                rows={8}
                placeholder={'Opowiedz nam o swoim pomyśle'}
              />
              <FormRow
                label={'Planowane korzyści'}
                formId={'benefits'}
                type={'textarea'}
                rows={4}
                placeholder={'Jakie korzyści może przynieść twój pomysł?'}
              />
              <FormRow
                label={'Planowane koszty'}
                formId={'costs'}
                type={'text'}
                placeholder={'Tu jakieś ranges do wyboru pewnie'}
              />
              <FormRow label={'Załączniki'} formId={'attachments'} type={'dropzone'} onFilesAdded={onFilesAdded} />
            </FlexBox>
            <SubmitButton />
          </form>
        </div>
      </FormProvider>
      <ModalOverlay isVisible={!!duplicatedEntriesError}>
        <ModalWindow>
          <DuplicatedEntriesModal filename={duplicatedEntriesError} />
        </ModalWindow>
      </ModalOverlay>
    </div>
  );
};

export default styled(CreateIdeaForm)`
  .create-idea-form {
    margin: ${({ theme }) => theme.margins.small};

    > form > div {
      flex-direction: column;
    }
  }
`;
