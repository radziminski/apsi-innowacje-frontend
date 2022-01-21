import React, { ForwardedRef } from 'react';
import { Paragraph } from '~/components/Text';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { AddedFilesList } from '~/components/Dropzone/AddedFilesList';
import { useDropzone } from '~/hooks/useDropzone';

export interface DropzoneProps {
  onFilesAdded?: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

export const FILES_TOTAL_SIZE_LIMIT = 1024 * 1024 * 1024; //1GB
export const FILE_SIZE_LIMIT = 10 * 1024 * 1024; //10MB

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropzoneBase = React.forwardRef((props: DropzoneProps & any, ref: ForwardedRef<HTMLDivElement>) => {
  const [DropzoneWrapper, currentFiles] = useDropzone(
    { multiple: true, onDrop: props.onFilesAdded, accept: props.accept, maxSize: FILE_SIZE_LIMIT },
    FILES_TOTAL_SIZE_LIMIT,
    ref
  );

  return (
    <div className={props.className} id={props.id}>
      <DropzoneWrapper>
        <FlexBox>
          <Center>
            <Paragraph>{props.placeholder ? props.placeholder : 'Upuść pliki lub kliknij, by wybrać'}</Paragraph>
          </Center>
        </FlexBox>
      </DropzoneWrapper>
      {currentFiles.length ? <AddedFilesList addedFiles={currentFiles} /> : null}
    </div>
  );
});

export const Dropzone = styled(DropzoneBase)`
  .dropzone {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.l};
    border-radius: ${({ theme }) => theme.borderRadiuses.normal};
    background-color: ${({ theme }) => theme.colors.white};

    > div {
      margin: auto;
    }
  }

  .dropzone__added-files {
    margin-top: ${({ theme }) => theme.spacing.s};
    display: inline-grid;
  }
`;
