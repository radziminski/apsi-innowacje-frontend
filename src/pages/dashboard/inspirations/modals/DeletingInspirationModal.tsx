import { Modal } from '~/components/Modal';
import { FlexBox } from '~/components/Box';
import { CenteredLoader } from '~/components/Loader';
import React from 'react';

export const DeletingInspirationModal = () => (
  <Modal
    content={
      <FlexBox flexDirection={'column'}>
        <span>Trwa usuwanie inspiracji...</span>
        <CenteredLoader />
      </FlexBox>
    }
  />
);
