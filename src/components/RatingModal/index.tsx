import React, { useRef, useState } from 'react';
import Rating from 'react-rating';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import Box, { Center, FlexBox } from '../Box';
import { Button } from '../Button';
import { TextArea } from '../forms/FormTextArea/TextArea';
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
  const [ratingValue, setRatingValue] = useState<number | undefined>(undefined);
  const ref = useRef(null);

  const onCloseModal = () => {
    if (isVisible && onClose) {
      onClose();
      setRatingTempValue(undefined);
      setRatingValue(undefined);
    }
  };

  useOutsideClick(ref, onCloseModal);

  return (
    <ModalOverlay isVisible={isVisible}>
      <ModalWindow>
        <Box padding="2rem" minWidth="600px" ref={ref}>
          <Heading3 textAlign="center">Oceń pomysł {ideaTitle ? `"${ideaTitle}"` : ''}</Heading3>
          <Box maxWidth="400px" margin="0 auto">
            <Center padding="1rem 0 0.2rem">
              Ocena*: {ratingTempValue ?? ratingValue ?? 'brak'}
              <Box marginLeft="auto">
                <Rating onHover={setRatingTempValue} onChange={setRatingValue} initialRating={ratingValue} />
              </Box>
            </Center>
            <Center padding="0.2rem 0 1rem">
              Komentarz:
              <Box marginLeft="auto">
                <TextArea />
              </Box>
            </Center>
          </Box>

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
              disabled={!ratingValue}
            />
          </FlexBox>
        </Box>
      </ModalWindow>
    </ModalOverlay>
  );
};

export default RatingModal;
