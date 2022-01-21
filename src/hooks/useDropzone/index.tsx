import React, { ForwardedRef } from 'react';
import { DropzoneOptions, useDropzone as useReactDropzone } from 'react-dropzone';
import { DuplicatedEntriesModal } from '~/components/Dropzone/DuplicatedEntriesModal';
import { FilesToLargeModal } from '~/components/Dropzone/FileToLargeModal';
import { FileErrorsModal } from '~/components/Dropzone/FileErrorModal';
import { TotalSizeTooBigModal } from '~/components/Dropzone/TotalSizeTooBigModal';
import { addFiles, FileEntry, clearFiles } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { FlexBox } from '~/components/Box';

export interface FileErrors {
  filesTooLarge: string[];
  erroredFiles: string[];
  totalSizeTooBig: boolean;
}

export const useDropzone = (
  reactDropzoneOptions: DropzoneOptions,
  totalFilesSizeLimit: number,
  dropzoneRef?: ForwardedRef<HTMLDivElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [React.FC<React.PropsWithChildren<any>>, FileEntry[]] => {
  const [fileErrors, setFileErrors] = React.useState<FileErrors>({
    filesTooLarge: [],
    erroredFiles: [],
    totalSizeTooBig: false
  });

  const duplicatedEntriesError = useSelector((state: RootState) => state.addedFiles.duplicationError);
  const currentFiles: FileEntry[] = useSelector((state: RootState) => state.addedFiles.addedFiles);
  const dispatch = useDispatch();

  const onFilesAdded = React.useCallback(
    (addedFiles: File[], fileRejections, event) => {
      if (addedFiles.length > 0) {
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
        if (currentTotalSize + addedFilesSize > totalFilesSizeLimit) {
          setFileErrors({ ...fileErrors, totalSizeTooBig: true });
          return;
        }

        dispatch(addFiles(addedFiles));
      }
      reactDropzoneOptions.onDrop && reactDropzoneOptions.onDrop(addedFiles, fileRejections, event);
    },
    [currentFiles, fileErrors]
  );

  const { getRootProps, getInputProps } = useReactDropzone({
    ...reactDropzoneOptions,
    onDrop: onFilesAdded
  });

  const hasErrors =
    fileErrors.filesTooLarge.length ||
    fileErrors.erroredFiles.length ||
    fileErrors.totalSizeTooBig ||
    duplicatedEntriesError;

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

  React.useEffect(() => {
    return () => {
      dispatch(clearFiles());
    };
  }, []);

  const DropzoneWrapper = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => (props: React.PropsWithChildren<any>) =>
      (
        <>
          <FlexBox
            {...getRootProps({
              className: 'dropzone'
            })}
            ref={dropzoneRef}>
            <input {...getInputProps()} />
            {props.children}
          </FlexBox>
          {hasErrors ? ( // need to render it conditionally, because otherwise fade-out appears temporarily on rerenders
            <>
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
            </>
          ) : null}
        </>
      ),
    [getRootProps, getInputProps, dropzoneRef, hasErrors, duplicatedEntriesError, fileErrors]
  );

  return [DropzoneWrapper, currentFiles];
};
