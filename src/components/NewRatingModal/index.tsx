import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/store/hooks';
import { clearReviewError, getIdeas, reviewIdea } from '~/store/slices/CreateIdeasSlice';
import Box, { Center, FlexBox } from '../Box';
import { Button } from '../Button';
import CommonModal from '../CommonModal';
import { TextArea } from '../forms/FormTextArea/TextArea';
import { Heading3, Heading5 } from '../Text';

interface Props {
  ideaId: number;
  ideaTitle?: string;
  isVisible: boolean;
  onClose?: () => void;
}

const NewRatingModal: React.FC<Props> = ({ onClose, ideaId, ideaTitle, isVisible }) => {
  const [ratingTempValue, setRatingTempValue] = useState<number | undefined>(undefined);
  const [ratingValue, setRatingValue] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const { isCreatingReview, isCreateReviewError, createdReviews } = useSelector(state => state.ideas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible && createdReviews.includes(ideaId)) {
      onCloseModal();
      dispatch(getIdeas());
    }
  }, [createdReviews, ideaId]);

  const onCloseModal = () => {
    if (isVisible && onClose) {
      setRatingTempValue(undefined);
      setRatingValue(undefined);
      setComment(undefined);
      dispatch(clearReviewError());

      onClose();
    }
  };

  const onSubmit = () => {
    if (!ratingValue) return;
    dispatch(reviewIdea({ ideaId, rating: ratingValue, description: comment }));
  };

  return (
    <CommonModal isVisible={isVisible} onClose={onCloseModal}>
      <Heading3 textAlign="center">Oceń pomysł {ideaTitle ? `"${ideaTitle}"` : ''}</Heading3>
      <Box maxWidth="400px" margin="0 auto">
        <Center padding="2rem 0 0.2rem">
          Ocena*: {ratingTempValue ?? ratingValue ?? 'brak'}
          <Box marginLeft="auto">
            <Rating onHover={setRatingTempValue} onChange={setRatingValue} initialRating={ratingValue} />
          </Box>
        </Center>
        <Center padding="0.2rem 0 2rem">
          Komentarz:
          <Box marginLeft="auto">
            <TextArea onChange={e => setComment(e.target.value)} />
          </Box>
        </Center>
      </Box>

      {isCreateReviewError && (
        <Box marginBottom="1rem">
          <Heading5 textAlign="center">Nie udało się dodać oceny. Spróbuj ponownie później.</Heading5>
        </Box>
      )}

      <FlexBox justifyContent="flex-end">
        <Button
          text="Powrót"
          onClick={() => {
            onCloseModal();
          }}
          primary={false}
        />
        <Box marginRight="0.5rem" />
        <Button text="Wyślij" onClick={onSubmit} isLoading={isCreatingReview} primary={true} disabled={!ratingValue} />
      </FlexBox>
    </CommonModal>
  );
};

export default NewRatingModal;
