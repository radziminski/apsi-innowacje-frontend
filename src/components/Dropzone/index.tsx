import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Paragraph } from '~/components/Text';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { AddedFilesList } from '~/components/Dropzone/AddedFilesList';
import { useFocusHandler } from '~/hooks/useFocusHandler';

export interface DropzoneProps {
  onFilesAdded: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropzoneBase = (props: DropzoneProps & any) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const dropzoneContainerRef = React.useRef<HTMLDivElement | null>(null);
  useFocusHandler(dropzoneContainerRef, props.onFocusChangeHandler);

  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      props.onFilesAdded(acceptedFiles);
    }
  }, [acceptedFiles]);

  const addedFiles = useSelector((state: RootState) => state.addedFiles.addedFiles);

  return (
    <div className={props.className}>
      <FlexBox
        {...getRootProps({
          className: 'dropzone',
          multiple: true,
          accept: props.accept,
          onDrop: props.onFilesAdded
        })}
        ref={ref => {
          dropzoneContainerRef.current = ref;
        }}>
        <input {...getInputProps()} />
        <Center>
          <Paragraph>{props.placeholder ? props.placeholder : 'Upuść pliki lub kliknij, by wybrać'}</Paragraph>
        </Center>
      </FlexBox>
      {addedFiles.length > 0 ? <AddedFilesList {...{ addedFiles }} /> : null}
    </div>
  );
};

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
