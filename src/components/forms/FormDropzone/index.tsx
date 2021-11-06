import React from 'react';
import { Dropzone } from '~/components/Dropzone';
import { FormComponentProps } from '~/components/forms';

export interface FormDropzoneProps extends FormComponentProps {
  onFilesAdded: (acceptedFiles) => void;
}

export const FormDropzone = (props: FormDropzoneProps) => {
  const { id, customClassName, ...rest } = props;

  return <Dropzone className={`${customClassName ? customClassName : ''}`} id={id} {...rest} />;
};
