import React from 'react';
import { Dropzone } from '~/components/Dropzone';
import { FormComponentProps } from '~/components/forms';
import styled from 'styled-components';

export interface FormDropzoneProps extends FormComponentProps {
  onFilesAdded?: (acceptedFiles) => void;
}

const FormDropzoneBase = (props: FormDropzoneProps) => {
  const { id, className, ...rest } = props;
  const dropzoneContainerRef = React.useRef<HTMLDivElement>(null);

  return <Dropzone className={`${className}`} id={id} {...rest} ref={dropzoneContainerRef} />;
};

export const FormDropzone = styled(FormDropzoneBase)`
  box-shadow: none;
  transition: box-shadow 0.15s ease-in-out;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.lightGray};
  }

  .dropzone {
    box-shadow: 0 0 0.15rem ${({ theme }) => theme.colors.primary}AF;
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary}AF;
    }
    &:focus {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary}AF;
    }
  }
`;
