import React from 'react';
import ReactDropzone from 'react-dropzone';
import { Heading4 } from '~/components/Text';
import styled from 'styled-components';
import { COLORS, MARGINS } from '~/styles/variables';
import { Center, FlexBox } from '~/components/Box';

export interface DropzoneProps {
  onFilesAdded: (files) => void;
  accept?: string | string[];
  customText?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropZoneBase = (props: DropzoneProps & any) => {
  return (
    <ReactDropzone multiple={true} accept={props.accept} onDrop={props.onFilesAdded}>
      {({ getRootProps, getInputProps }) => (
        <FlexBox className={`${props.className}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <Center>
            <Heading4>{props.placeholder ? props.placeholder : 'Upuść pliki lub kliknij, by dodać'}</Heading4>
          </Center>
        </FlexBox>
      )}
    </ReactDropzone>
  );
};

export const Dropzone = styled(DropZoneBase)`
  width: 100%;
  padding: ${MARGINS.big};
  border: 2px ${COLORS.primary} dashed;
  border-radius: 1.5rem;
  // background: repeating-linear-gradient(45deg, ${COLORS.primary} 2px, ${COLORS.white} 15px);

  &:hover {
    cursor: pointer;
  }
  > div {
    margin: auto;
  }
`;
