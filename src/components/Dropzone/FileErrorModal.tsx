import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { Button } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';

export interface FileErrorsModalProps {
  files: string[];
  onClick: () => void;
  className?: string;
}

const FileErrorsModalBase = (props: FileErrorsModalProps) => {
  const { files } = props;
  return (
    <ModalWindow>
      <Center className={props.className}>
        <span>Nie udało się dodać plik{files.length > 1 ? 'ów' : 'u'}:</span>
        <ul>
          {files.map((filename, index) => {
            return <li key={index}>{filename}</li>;
          })}
        </ul>
        <Button onClick={props.onClick} text={'Ok'} id={'file-errors-modal__ok-button'} />
      </Center>
    </ModalWindow>
  );
};

export const FileErrorsModal = styled(FileErrorsModalBase)`
  max-width: 50%;
  min-height: 20%;
  flex-direction: column;

  span {
    margin: ${({ theme }) => theme.margins.medium} ${({ theme }) => theme.margins.small};
  }

  #file-errors-modal__ok-button {
    align-self: flex-end;
  }

  button {
    margin-top: ${({ theme }) => theme.margins.small};
  }
`;
