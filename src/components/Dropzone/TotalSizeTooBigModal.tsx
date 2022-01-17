import React from 'react';
import styled from 'styled-components';
import { Modal } from '~/components/Modal';

export interface TotalSizeTooBigModalModalProps {
  onClick: () => void;
  className?: string;
}

export const TotalSizeTooBigModal = styled((props: TotalSizeTooBigModalModalProps) => {
  return (
    <Modal
      content={<span>Dodane pliki są za duże. Można dodać maksymalnie 1GB danych.</span>}
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
