import React, { ForwardedRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paragraph } from '~/components/Text';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { AddedFilesList } from '~/components/Dropzone/AddedFilesList';
import { ModalOverlay } from '~/components/ModalOverlay';
import { DuplicatedEntriesModal } from '~/components/Dropzone/DuplicatedEntriesModal';
import { FilesToLargeModal } from '~/components/Dropzone/FileToLargeModal';
import { FileErrorsModal } from '~/components/Dropzone/FileErrorModal';

export interface DropzoneProps {
  onFilesAdded: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

interface FileErrors {
  filesToLarge: string[];
  erroredFiles: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropzoneBase = React.forwardRef((props: DropzoneProps & any, ref: ForwardedRef<HTMLDivElement>) => {
  const duplicatedEntriesError = useSelector((state: RootState) => state.addedFiles.duplicationError);
  const [fileErrors, setFileErrors] = React.useState<FileErrors>({ filesToLarge: [], erroredFiles: [] });
  const hasErrors = fileErrors.filesToLarge.length || fileErrors.erroredFiles.length || duplicatedEntriesError;

  const onFilesAdded = React.useCallback(
    (addedFiles: File[], fileRejections) => {
      if (fileRejections.length > 0) {
        const toLargeFiles = fileRejections
          .filter(file => file.errors.some(err => err.code === 'file-too-large'))
          .map(file => file.file.name);
        const erroredFiles = fileRejections
          .filter(file => file.errors.some(err => err.code !== 'file-too-large'))
          .map(file => file.file.name);
        setFileErrors({
          filesToLarge: [...(fileErrors.filesToLarge || []), ...toLargeFiles],
          erroredFiles: [...(fileErrors.erroredFiles || []), ...erroredFiles]
        });

        return;
      }
      props.onFilesAdded(addedFiles);
    },
    [props.accept, props.onFilesAdded]
  );

  const addedFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: onFilesAdded,
    accept: props.accept,
    maxSize: 10 * 1024 * 1024
  });

  const onFilesErrorModalClose = React.useCallback(
    () => setFileErrors({ ...fileErrors, erroredFiles: [] }),
    [fileErrors]
  );

  const onFilesToLargeModalClose = React.useCallback(
    () => setFileErrors({ ...fileErrors, filesToLarge: [] }),
    [fileErrors]
  );

  return (
    <div className={props.className}>
      <FlexBox
        {...getRootProps({
          className: 'dropzone'
        })}
        ref={ref}>
        <input {...getInputProps()} />
        <Center>
          <Paragraph>{props.placeholder ? props.placeholder : 'Upuść pliki lub kliknij, by wybrać'}</Paragraph>
        </Center>
      </FlexBox>
      {addedFiles.length ? <AddedFilesList {...{ addedFiles }} /> : null}
      {hasErrors ? ( // need to render it conditionally, because otherwise fade-out appears temporarily on rerenders
        <ModalOverlay isVisible={!!hasErrors}>
          {duplicatedEntriesError && <DuplicatedEntriesModal filename={duplicatedEntriesError} />}
          {fileErrors.filesToLarge.length && !duplicatedEntriesError && (
            <FilesToLargeModal files={fileErrors.filesToLarge} onClick={onFilesToLargeModalClose} />
          )}
          {fileErrors.erroredFiles.length && !fileErrors.filesToLarge.length && !duplicatedEntriesError && (
            <FileErrorsModal files={fileErrors.erroredFiles} onClick={onFilesErrorModalClose} />
          )}
        </ModalOverlay>
      ) : null}
    </div>
  );
});

export const Dropzone = styled(DropzoneBase)`
  .dropzone {
    width: 100%;
    padding: ${({ theme }) => theme.margins.big};
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.white};

    > div {
      margin: auto;
    }
  }

  .dropzone__added-files {
    margin-top: ${({ theme }) => theme.margins.small};
  }
`;
