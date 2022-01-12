import React from 'react';
import Box, { FlexBox } from '../Box';
import { Button } from '../Button';
import CommonModal from '../CommonModal';
import { Heading3, Heading5 } from '../Text';

interface Props {
  title?: string;
  onConfirm: () => void;
  isVisible: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  isError?: boolean;
}

export const ConfirmModal: React.FC<Props> = ({ title, isVisible, onClose, onConfirm, isLoading, isError }) => {
  const onCloseModal = () => {
    if (isVisible && onClose) {
      onClose();
    }
  };

  return (
    <CommonModal isVisible={isVisible} onClose={onCloseModal}>
      <Heading3 textAlign="center">{title}</Heading3>

      {isError && (
        <Box marginY="1rem">
          <Heading5 textAlign="center">Wystąpił błąd. Spróbuj ponownie później.</Heading5>
        </Box>
      )}

      <FlexBox justifyContent="flex-end" marginTop="2rem">
        <Button
          text="Powrót"
          onClick={() => {
            onCloseModal();
          }}
          primary={false}
        />
        <Box marginRight="0.5rem" />
        <Button text="Tak" onClick={onConfirm} isLoading={isLoading} primary={true} />
      </FlexBox>
    </CommonModal>
  );
};

export default ConfirmModal;
