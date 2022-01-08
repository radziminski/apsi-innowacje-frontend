import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { IdeaDto } from '~/api-client';
import { useSelector } from '~/store/hooks';
import { clearDeleteError, deleteIdea } from '~/store/slices/CreateIdeasSlice';
import Box, { Card, FlexBox } from '../Box';
import ConfirmModal from '../ConfirmModal';
import IdeaRatingsModal from '../IdeaRatingsModal';
import NewRatingModal from '../NewRatingModal';
import { Heading4, Heading5, Heading6, Paragraph } from '../Text';
import { ReviewButton } from './parts';

interface Props {
  idea: IdeaDto;
}
export const IdeaCard: React.FC<Props> = ({ idea }) => {
  const [newReviewModalOpened, setNewReviewModalOpened] = useState(false);
  const [reviewsModalOpened, setReviewsModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const { deletedPosts, isDeleting, isDeleteError } = useSelector(state => state.ideas);
  const dispatch = useDispatch();

  const onAddReview = () => {
    setNewReviewModalOpened(true);
  };

  const seeReviews = () => {
    setReviewsModalOpened(true);
  };

  const onDeleteModal = () => {
    idea.id && dispatch(deleteIdea(idea.id));
  };

  useEffect(() => {
    if (deleteModalOpened && idea.id && deletedPosts.includes(idea.id)) setDeleteModalOpened(false);
  }, [idea, deleteModalOpened, deletedPosts]);

  const canBeDeleted = idea.authorId == currentUser?.id;

  if (idea.id && deletedPosts.includes(idea.id)) return null;

  if (idea.blocked) {
    return (
      <Card>
        <Heading6 fontWeight={700}>Pomysł został zablokowany przez moderatorów.</Heading6>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <FlexBox flexDirection="column" width="100%">
          <FlexBox justifyContent="flex-end" alignItems="center">
            <FlexBox
              as="button"
              alignItems="center"
              cursor={!idea.rating ? 'not-allowed' : 'pointer'}
              disabled={!idea.rating}
              onClick={seeReviews}
              marginRight="auto">
              <Box transform="scale(0.6) translateX(-5rem)">
                <FlexBox alignItems="center">
                  <Rating initialRating={idea.rating} readonly />
                  <Box marginRight="0.6rem" />
                  <Box>{idea.rating ? `(ocena: ${Math.round(idea.rating * 10) / 10})` : '(brak ocen)'}</Box>
                </FlexBox>
              </Box>
            </FlexBox>
            {!idea.alreadyReviewed && (
              <ReviewButton onClick={onAddReview}>
                <AiFillStar />
                <Box marginRight="0.25rem" />
                <Heading5 fontWeight={400}>Oceń pomysł</Heading5>
              </ReviewButton>
            )}
            {canBeDeleted && (
              <Box as="button" transform="scale(1.2)" paddingLeft="0.5rem" onClick={() => setDeleteModalOpened(true)}>
                <MdDeleteForever />
              </Box>
            )}
          </FlexBox>

          <FlexBox alignItems="center">
            <Heading6 fontWeight={400}>
              {idea.anonymous ? 'Anonimowy użytkownik' : `Użytkownik ${idea.authorId}`}
            </Heading6>
            <Box paddingX="0.5rem" transform="translateY(-1px)" opacity={0.75}>
              <Heading6 fontWeight={400} fontSize="0.75rem">
                |
              </Heading6>
            </Box>
            <Heading6 fontWeight={400}>{idea.date}</Heading6>
          </FlexBox>
          <Box paddingBottom="0.5rem" />
          <Box paddingBottom="1rem" overflow="hidden">
            <Heading4 fontSize="1.35rem" fontWeight={500}>
              {idea.title ?? 'Nieznany tytuł'}
            </Heading4>
          </Box>
          <Box paddingBottom="1rem" overflow="hidden">
            <Paragraph>{idea.description}</Paragraph>
          </Box>

          {idea.costs && (
            <Heading6 fontWeight={400} fontSize="0.75rem">
              Koszt: {idea.costs.map(cost => cost + ' | ')}
            </Heading6>
          )}
          {idea.keywords}
        </FlexBox>
      </Card>
      {idea && idea.id && (
        <>
          <IdeaRatingsModal
            ideaId={idea.id}
            ideaTitle={idea.title ?? 'Nieznany tytuł'}
            isVisible={reviewsModalOpened}
            onClose={() => setReviewsModalOpened(false)}
          />
          <NewRatingModal
            ideaId={idea.id}
            ideaTitle={idea.title ?? 'Nieznany tytuł'}
            isVisible={newReviewModalOpened}
            onClose={() => setNewReviewModalOpened(false)}
          />
          {canBeDeleted && (
            <ConfirmModal
              isVisible={deleteModalOpened}
              onClose={() => {
                setDeleteModalOpened(false);
                dispatch(clearDeleteError());
              }}
              title={`Czy na pewno chcesz usunąć pomysł "${idea.title ?? 'Nieznany tytuł'}"`}
              onConfirm={onDeleteModal}
              isLoading={isDeleting}
              isError={isDeleteError}
            />
          )}
        </>
      )}
    </>
  );
};

export default IdeaCard;
