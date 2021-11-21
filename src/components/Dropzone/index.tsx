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
import { FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { TotalSizeTooBigModal } from '~/components/Dropzone/TotalSizeTooBigModal';

export interface DropzoneProps {
  onFilesAdded: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

interface FileErrors {
  filesTooLarge: string[];
  erroredFiles: string[];
  totalSizeTooBig: boolean;
}

const FILES_TOTAL_SIZE_LIMIT = 1024 * 1024 * 1024; //1GB
const FILE_SIZE_LIMIT = 10 * 1024 * 1024; //10MB

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropzoneBase = React.forwardRef((props: DropzoneProps & any, ref: ForwardedRef<HTMLDivElement>) => {
  const duplicatedEntriesError = useSelector((state: RootState) => state.addedFiles.duplicationError);
  const currentFiles: FileEntry[] = useSelector((state: RootState) => state.addedFiles.addedFiles);
  const [fileErrors, setFileErrors] = React.useState<FileErrors>({
    filesTooLarge: [],
    erroredFiles: [],
    totalSizeTooBig: false
  });
  const hasErrors =
    fileErrors.filesTooLarge.length ||
    fileErrors.erroredFiles.length ||
    fileErrors.totalSizeTooBig ||
    duplicatedEntriesError;

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
          ...fileErrors,
          filesTooLarge: [...(fileErrors.filesTooLarge || []), ...toLargeFiles],
          erroredFiles: [...(fileErrors.erroredFiles || []), ...erroredFiles]
        });

        return;
      }
      const currentTotalSize = currentFiles.reduce((sum, file) => file.file.size + sum, 0);
      const addedFilesSize = addedFiles.reduce((sum, file) => file.size + sum, 0);
      if (currentTotalSize + addedFilesSize > FILES_TOTAL_SIZE_LIMIT) {
        setFileErrors({ ...fileErrors, totalSizeTooBig: true });
        return;
      }
      props.onFilesAdded(addedFiles);
    },
    [props.accept, props.onFilesAdded, currentFiles, fileErrors]
  );

  const addedFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: onFilesAdded,
    accept: props.accept,
    maxSize: FILE_SIZE_LIMIT
  });

  const onFilesErrorModalClose = React.useCallback(
    () => setFileErrors({ ...fileErrors, erroredFiles: [] }),
    [fileErrors]
  );

  const onFilesToLargeModalClose = React.useCallback(
    () => setFileErrors({ ...fileErrors, filesTooLarge: [] }),
    [fileErrors]
  );

  const onTotalSizeTooBigModalClose = React.useCallback(
    () => setFileErrors({ ...fileErrors, totalSizeTooBig: false }),
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
          {fileErrors.filesTooLarge.length && !duplicatedEntriesError && (
            <FilesToLargeModal files={fileErrors.filesTooLarge} onClick={onFilesToLargeModalClose} />
          )}
          {fileErrors.erroredFiles.length && !fileErrors.filesTooLarge.length && !duplicatedEntriesError && (
            <FileErrorsModal files={fileErrors.erroredFiles} onClick={onFilesErrorModalClose} />
          )}
          {fileErrors.filesTooLarge &&
            !fileErrors.erroredFiles.length &&
            !fileErrors.filesTooLarge.length &&
            !duplicatedEntriesError && <TotalSizeTooBigModal onClick={onTotalSizeTooBigModalClose} />}
        </ModalOverlay>
      ) : null}
    </div>
  );
});

export const Dropzone = styled(DropzoneBase)`
  .dropzone {
    width: 100%;
    padding: ${({ theme }) => theme.margins.big};
    border-radius: ${({ theme }) => theme.borderRadiuses.normal};
    background-color: ${({ theme }) => theme.colors.white};

    > div {
      margin: auto;
    }
  }

  .dropzone__added-files {
    margin-top: ${({ theme }) => theme.margins.small};
  }
`;
