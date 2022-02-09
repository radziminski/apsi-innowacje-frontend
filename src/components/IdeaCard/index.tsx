import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdBlock, MdDeleteForever } from 'react-icons/md';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { IdeaDto, IdeaDtoStatusEnum, UserDto, UserRole } from '~/api-client';
import { useSelector } from '~/store/hooks';
import { blockIdea, clearBlockError, clearDeleteError, deleteIdea } from '~/store/slices/CreateIdeasSlice';
import { COLORS } from '~/styles/variables';
import Box, { Card, FlexBox } from '../Box';
import ConfirmModal from '../ConfirmModal';
import IdeaRatingsModal from '../IdeaRatingsModal';
import NewRatingModal from '../NewRatingModal';
import Text, { Heading4, Heading5, Heading6, Paragraph } from '../Text';
import { RatingSettings, ReviewButton } from './parts';
import { getAllUsers } from '~/store/slices/CreateUserSlice';

interface Props {
  idea: IdeaDto;
  votingMode?: boolean;
}

const getStatusString = (status: IdeaDtoStatusEnum) => {
  switch (status) {
    case IdeaDtoStatusEnum.New:
      return 'Nowo dodany';
    case IdeaDtoStatusEnum.Accepted:
      return 'Zaakceptowany';
    case IdeaDtoStatusEnum.Rejected:
      return 'Odrzucony';
    case IdeaDtoStatusEnum.PutAway:
      return 'Odroczony';
    case IdeaDtoStatusEnum.ReuqestForDetails:
      return 'Prośba o szczegóły';
  }
};

export const IdeaCard: React.FC<Props> = ({ idea, votingMode }) => {
  const [newReviewModalOpened, setNewReviewModalOpened] = useState(false);
  const [reviewsModalOpened, setReviewsModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [blockModalOpened, setBlockModalOpened] = useState(false);
  const { currentUser, allUsers, isLoadingAllUsers, isErrorAllUsers } = useSelector(state => state.user);
  const [author, setAuthor] = useState<UserDto | null | undefined>(
    allUsers ? allUsers.find(user => user.id === idea?.authorId) : null
  );
  const { deletedIdeas, isDeleting, isDeleteError, blockedIdeas, isBlocking, isBlockError } = useSelector(
    state => state.ideas
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!allUsers && !isLoadingAllUsers && !isErrorAllUsers) {
      dispatch(getAllUsers());
    }
  }, []);

  React.useEffect(() => {
    if (allUsers) {
      setAuthor(allUsers.find(user => user.id === idea?.authorId));
    }
  }, [allUsers, idea]);

  const onAddReview = () => {
    setNewReviewModalOpened(true);
  };

  const seeReviews = () => {
    setReviewsModalOpened(true);
  };

  const onDelete = () => {
    idea.id && dispatch(deleteIdea(idea.id));
  };

  const onBlock = () => {
    dispatch(blockIdea(idea));
  };

  useEffect(() => {
    if (deleteModalOpened && idea.id && deletedIdeas.includes(idea.id)) setDeleteModalOpened(false);
  }, [idea, deleteModalOpened, deletedIdeas]);

  useEffect(() => {
    if (blockModalOpened && idea.id && blockedIdeas.includes(idea.id)) setBlockModalOpened(false);
  }, [idea, deleteModalOpened, deletedIdeas]);

  const canBeDeleted =
    !votingMode &&
    (idea.authorId == currentUser?.id || ((currentUser && currentUser.userRole === UserRole.Admin) as boolean));

  const canBeBlocked = currentUser?.userRole && [UserRole.Admin].includes(currentUser?.userRole);
  const isAdmin = currentUser?.userRole && UserRole.Admin === currentUser?.userRole;
  const canBeReviewed = !votingMode;

  if (idea.id && deletedIdeas.includes(idea.id)) return null;

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
            {!idea.alreadyReviewed && canBeReviewed && (
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
            {canBeBlocked && (
              <Box as="button" transform="scale(1.2)" paddingLeft="0.5rem" onClick={() => setBlockModalOpened(true)}>
                <MdBlock />
              </Box>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            {isAdmin && <RatingSettings ideaId={idea.id!} />}
          </FlexBox>

          <FlexBox alignItems="center">
            <Heading6 fontWeight={400}>
              {idea.anonymous
                ? 'Anonimowy użytkownik'
                : author === null
                ? '...'
                : author === undefined
                ? 'Nieznany użytkownik'
                : `${author.firstName} ${author.lastName}`}
            </Heading6>
            <Box paddingX="0.5rem" transform="translateY(-1px)" opacity={0.75}>
              <Heading6 fontWeight={400} fontSize="0.75rem">
                |
              </Heading6>
            </Box>
            <Heading6 fontWeight={400}>{idea.date}</Heading6>
          </FlexBox>
          <Box paddingBottom="0.25rem" />

          {idea.status && (
            <FlexBox>
              <Paragraph as="span" fontWeight={500} fontSize="0.75rem">
                Status:{' '}
              </Paragraph>
              <Box marginRight="0.25rem" />
              <Paragraph fontSize="0.75rem">{getStatusString(idea.status)}</Paragraph>
            </FlexBox>
          )}

          <Box paddingBottom="0.25rem" />

          <Box paddingBottom="0.8rem" overflow="hidden">
            <Heading4 fontSize="1.35rem" fontWeight={500}>
              {idea.title ?? 'Nieznany tytuł'}
            </Heading4>
          </Box>
          {!!idea.keywords?.length && (
            <FlexBox paddingBottom="1rem" overflow="hidden">
              {idea.keywords.map(keyword =>
                keyword ? (
                  <Box
                    key={keyword}
                    padding="0.2rem"
                    borderRadius="4px"
                    background={COLORS.primary}
                    color={COLORS.white}
                    marginRight="0.5rem">
                    <Text fontSize="0.75rem">{keyword}</Text>
                  </Box>
                ) : null
              )}
            </FlexBox>
          )}
          <Box paddingBottom="1rem" overflow="hidden">
            <Paragraph>{idea.description}</Paragraph>
          </Box>

          {idea.costs && (
            <Heading6 fontWeight={300} fontSize="1rem">
              <Paragraph as="span" fontWeight={500}>
                Koszt:{' '}
              </Paragraph>
              {idea.costs.map(({ value }, i) => value + (i === (idea.costs?.length || 0) - 1 ? 'zł' : 'zł - '))}
            </Heading6>
          )}
          <Box paddingBottom="1rem" />

          {idea.benefits && (
            <>
              <Paragraph as="span" fontWeight={500}>
                Korzyści:
              </Paragraph>
              {idea.benefits.map(benefit => (
                <Box key={benefit.id} paddingY="0.25rem">
                  {benefit.description}
                </Box>
              ))}
            </>
          )}
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
              onConfirm={onDelete}
              isLoading={isDeleting}
              isError={isDeleteError}
            />
          )}
          {canBeBlocked && (
            <ConfirmModal
              isVisible={blockModalOpened}
              onClose={() => {
                setBlockModalOpened(false);
                dispatch(clearBlockError());
              }}
              title={`Czy na pewno chcesz zablokować pomysł "${idea.title ?? 'Nieznany tytuł'}"`}
              onConfirm={onBlock}
              isLoading={isBlocking}
              isError={isBlockError}
            />
          )}
        </>
      )}
    </>
  );
};

export default IdeaCard;
