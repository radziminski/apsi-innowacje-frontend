import React from 'react';
import { Modal } from '~/components/Modal';
import { FlexBox } from '~/components/Box';
import { CenteredLoader } from '~/components/Loader';
import styled from 'styled-components';

export const SubjectRequestPendingModal = styled((props: { className?: string }) => (
  <div className={props.className}>
    <Modal
      content={
        <FlexBox flexDirection={'column'}>
          <span>Trwa dodawanie tematu...</span>
          <CenteredLoader />
        </FlexBox>
      }
    />
  </div>
))`
  > div {
    height: 100%;
  }
`;
