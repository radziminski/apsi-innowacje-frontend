import React from 'react';
import { Dropzone } from '~/components/Dropzone';
import { FormComponentProps } from '~/components/forms';
import styled from 'styled-components';

export interface FormDropzoneProps extends FormComponentProps {
  onFilesAdded: (acceptedFiles) => void;
}

const FormDropzoneBase = (props: FormDropzoneProps) => {
  const { id, customClassName, className, ...rest } = props;

  return <Dropzone className={`${customClassName ? customClassName : ''} ${className}`} id={id} {...rest} />;
};

export const FormDropzone = styled(FormDropzoneBase)`
  &.form-row_form-component--active {
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
