import React from 'react';
import { Modal } from '~/components/Modal';
import { FlexBox } from '~/components/Box';
import { CenteredLoader } from '~/components/Loader';

export const IdeaRequestPendingModal = () => (
  <Modal
    content={
      <FlexBox flexDirection={'column'}>
        <span>Trwa dodawanie pomysłu...</span>
        <CenteredLoader />
      </FlexBox>
    }
  />
);
