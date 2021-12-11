import React from 'react';
import { Modal } from '~/components/Modal';
import styled from 'styled-components';

export interface FileErrorsModalProps {
  files: string[];
  onClick: () => void;
  className?: string;
}

export const FileErrorsModal = styled((props: FileErrorsModalProps) => {
  return (
    <Modal
      textContent={
        <>
          <span>Nie udało się dodać plik{props.files.length > 1 ? 'ów' : 'u'}:</span>
          <ul className={props.className}>
            {props.files.map((filename, index) => {
              return <li key={index}>{filename}</li>;
            })}
          </ul>
        </>
      }
      buttons={[
        {
          text: 'Ok',
          onClick: props.onClick
        }
      ]}
    />
  );
})`
  margin-top: ${({ theme }) => theme.spacing.s};
`;
