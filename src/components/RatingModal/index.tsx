import React, { useRef, useState } from 'react';
import Rating from 'react-rating';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import Box, { FlexBox } from '../Box';
import { Button } from '../Button';
import { ModalOverlay } from '../ModalOverlay';
import { ModalWindow } from '../ModalWindow';
import { Heading3 } from '../Text';

interface Props {
  ideaId: number;
  ideaTitle?: string;
  isVisible: boolean;
  onClose?: () => void;
}

const RatingModal: React.FC<Props> = ({ onClose, ideaId, ideaTitle, isVisible }) => {
  const [ratingTempValue, setRatingTempValue] = useState<number | undefined>(undefined);
  const [ratingValue, setRatingValue] = useState(0);
  const ref = useRef(null);

  const onCloseModal = () => {
    if (isVisible && onClose) {
      onClose();
      setRatingTempValue(undefined);
      setRatingValue(0);
    }
  };

  useOutsideClick(ref, onCloseModal);

  return (
    <ModalOverlay isVisible={isVisible}>
      <ModalWindow>
        <Box padding="2rem" minWidth="600px" ref={ref}>
          <Heading3 textAlign="center">Oceń pomysł {ideaTitle ? `"${ideaTitle}"` : ''}</Heading3>
          <FlexBox justifyContent="center" paddingY="1rem">
            <Rating onHover={setRatingTempValue} onChange={setRatingValue} initialRating={ratingValue} />
          </FlexBox>
          <FlexBox justifyContent="center">Ocena: {ratingTempValue ?? ratingValue}</FlexBox>
          <FlexBox justifyContent="flex-end">
            <Button
              text="Powrót"
              onClick={() => {
                onCloseModal();
              }}
              primary={false}
            />
            <Box marginRight="0.5rem" />
            <Button
              text="Wyślij"
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log(ideaId);
              }}
              primary={true}
            />
          </FlexBox>
        </Box>
      </ModalWindow>
    </ModalOverlay>
  );
};

export default RatingModal;
