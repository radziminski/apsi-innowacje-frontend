import React, { useRef } from 'react';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import Box from '../Box';
import { ModalOverlay } from '../ModalOverlay';
import { ModalWindow } from '../ModalWindow';

interface Props {
  onClose: () => void;
  isVisible: boolean;
}
export const CommonModal: React.FC<Props> = ({ onClose, isVisible, children }) => {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  return (
    <ModalOverlay isVisible={isVisible}>
      <ModalWindow>
        <Box padding="2rem" minWidth="600px" ref={ref}>
          {children}
        </Box>
      </ModalWindow>
    </ModalOverlay>
  );
};

export default CommonModal;
