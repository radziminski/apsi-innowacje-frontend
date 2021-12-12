import React from 'react';
import styled from 'styled-components';
import { Modal } from '~/components/Modal';

export interface FilesToLargeModalProps {
  files: string[];
  onClick: () => void;
  className?: string;
}

export const FilesToLargeModal = styled((props: FilesToLargeModalProps) => {
  const { files } = props;

  return (
    <Modal
      textContent={
        <>
          <span>
            Dodano za duż{files.length > 1 ? 'e' : 'y'} plik{files.length > 1 && 'i'}. Limit to 10MB.
          </span>
          <ul className={props.className}>
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
