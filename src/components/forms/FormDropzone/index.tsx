import React from 'react';
import { Dropzone } from '~/components/Dropzone';
import { FormComponentProps } from '~/components/forms';
import styled from 'styled-components';

export interface FormDropzoneProps extends FormComponentProps {
  onFilesAdded: (acceptedFiles) => void;
}

const FormDropzoneBase = (props: FormDropzoneProps) => {
  const { id, customClassName, className, ...rest } = props;
  const dropzoneContainerRef = React.useRef<HTMLDivElement>(null);

  return <Dropzone className={`${customClassName || ''} ${className}`} id={id} {...rest} ref={dropzoneContainerRef} />;
};

export const FormDropzone = styled(FormDropzoneBase)`
  &.form-row_form-component:focus {
    .dropzone {
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary};
    }
  }

  .dropzone {
    box-shadow: 0 0 0.15rem ${({ theme }) => theme.colors.primary};
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0.25rem ${({ theme }) => theme.colors.primary};
    }
  }
`;
