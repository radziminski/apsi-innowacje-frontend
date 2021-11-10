import React from 'react';
import styled from 'styled-components';
import { Center } from '~/components/Box';
import { Button } from '~/components/Button';
import { ModalWindow } from '~/components/ModalWindow';

export interface FilesToLargeModalProps {
  files: string[];
  onClick: () => void;
  className?: string;
}

const FilesToLargeModalBase = (props: FilesToLargeModalProps) => {
  const { files } = props;
  return (
    <ModalWindow>
      <Center className={props.className}>
        <span>
          Dodano za duż{files.length > 1 ? 'e' : 'y'} plik{files.length > 1 && 'i'}. Limit to 10MB.
        </span>
        <ul>
          {files.map((filename, index) => {
            return (
              <>
                <li key={index}>
                  {files.length > 1 ? '-' : ''} {filename}
                </li>
              </>
            );
          })}
        </ul>
        <Button onClick={props.onClick} text={'Ok'} id={'file-to-large-modal__ok-button'} />
      </Center>
    </ModalWindow>
  );
};

export const FilesToLargeModal = styled(FilesToLargeModalBase)`
  max-width: 50%;
  min-height: 20%;
  flex-direction: column;

  #file-to-large-modal__ok-button {
    align-self: flex-end;
  }

  ul {
    margin-top: ${({ theme }) => theme.margins.small};
  }

  button {
    margin-top: ${({ theme }) => theme.margins.small};
  }
`;
