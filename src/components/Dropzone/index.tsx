import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Heading4, Heading5 } from '~/components/Text';
import styled from 'styled-components';
import { COLORS, MARGINS } from '~/styles/variables';
import { Center, FlexBox } from '~/components/Box';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { FileEntry } from '~/store/slices/CreateIdeaAddedFilesSlice';
import prettyBytes from 'pretty-bytes';

export interface DropzoneProps {
  onFilesAdded: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropzoneBase = (props: DropzoneProps & any) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      props.onFilesAdded(acceptedFiles);
    }
  }, [acceptedFiles]);

  const files = useSelector((state: RootState) => state.addedFiles.addedFiles).map((fileEntry: FileEntry) => {
    return (
      <li key={fileEntry.id}>
        {fileEntry.file.name} - {prettyBytes(fileEntry.file.size)}
      </li>
    );
  });

  return (
    <div className={props.className}>
      <FlexBox
        {...getRootProps({
          className: 'dropzone',
          multiple: true,
          accept: props.accept,
          onDrop: props.onFilesAdded
        })}>
        <input {...getInputProps()} />
        <Center>
          <Heading4>{props.placeholder ? props.placeholder : 'Upuść pliki lub kliknij, by wybrać'}</Heading4>
        </Center>
      </FlexBox>
      {acceptedFiles.length > 0 ? (
        <div className={'dropzone__added-files'}>
          <Heading5>Dodane pliki:</Heading5>
          <ul>{files}</ul>
        </div>
      ) : null}
    </div>
  );
};

export const Dropzone = styled(DropzoneBase)`
  .dropzone {
    width: 100%;
    padding: ${MARGINS.big};
    border: 2px ${COLORS.primary} dashed;
    border-radius: 1.5rem;
    background-color: ${COLORS.white};

    &:hover {
      cursor: pointer;
    }
    > div {
      margin: auto;
    }
  }

  .dropzone__added-files {
    margin-top: ${MARGINS.small};
  }
`;
