import React, { useEffect } from 'react';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/store/hooks';
import { getIdeaReviews } from '~/store/slices/CreateIdeasSlice';
import Box, { Center, FlexBox } from '../Box';
import CommonModal from '../CommonModal';
import Loader from '../Loader';
import { Heading3, Heading5, Heading6, Paragraph } from '../Text';

interface Props {
  ideaId: number;
  ideaTitle?: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const IdeaRatingsModal: React.FC<Props> = ({ ideaId, isVisible, onClose, ideaTitle }) => {
  const dispatch = useDispatch();
  const { reviews, isLoadingReviews } = useSelector(state => state.ideas);

  useEffect(() => {
    if (isVisible && !reviews[ideaId]) {
      dispatch(getIdeaReviews(ideaId));
    }
  }, [isVisible, ideaId]);

  const onCloseModal = () => {
    if (isVisible && onClose) {
      onClose();
    }
  };

  return (
    <CommonModal isVisible={isVisible} onClose={onCloseModal}>
      <Heading3 textAlign="center"> Oceny pomysłu &quot;{ideaTitle}&quot;</Heading3>
      {isLoadingReviews ? (
        <Center minHeight="200px">
          <Loader />
        </Center>
      ) : (
        <FlexBox flexDirection="column">
          {reviews[ideaId]?.map((review, index) => {
            return (
              <>
                {!!index && <Box height="1px" background="black" width="300px" margin="0 auto" opacity={0.5} />}
                <Box paddingY="1rem" key={review.id} width="100%" maxWidth="300px" margin="1rem auto">
                  {review.date && (
                    <FlexBox justifyContent="space-between">
                      <Heading6>{review.date.slice(0, 10)}</Heading6>
                    </FlexBox>
                  )}
                  <FlexBox alignItems="center">
                    <Heading5>Ocena: </Heading5>
                    <Box marginLeft="auto">
                      <Rating initialRating={review.rating} readonly />
                    </Box>
                  </FlexBox>
                  <FlexBox alignItems="center" marginTop="0.5rem">
                    <Heading5>Komentarz: </Heading5>
                    <Box marginLeft="auto" width="150px">
                      <Paragraph fontSize="0.75rem">{review.description ?? 'Brak'}</Paragraph>
                    </Box>
                  </FlexBox>
                </Box>
              </>
            );
          })}
        </FlexBox>
      )}
    </CommonModal>
  );
};

export default IdeaRatingsModal;
