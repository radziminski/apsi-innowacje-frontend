import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { IdeaDto } from '~/api-client';
import Box, { Card, FlexBox } from '../Box';
import NewRatingModal from '../NewRatingModal';
import { Heading4, Heading5, Heading6, Paragraph } from '../Text';
import { ReviewButton } from './parts';

interface Props {
  idea: IdeaDto;
}
export const IdeaCard: React.FC<Props> = ({ idea }) => {
  const [reviewModalOpened, setReviewModalOpened] = useState(false);

  const onAddReview = () => {
    setReviewModalOpened(true);
  };

  return (
    <>
      <Card>
        <FlexBox flexDirection="column" width="100%">
          <FlexBox>
            <FlexBox alignItems="center">
              <Box transform="scale(0.6) translateX(-5rem)">
                <FlexBox alignItems="center">
                  <Rating initialRating={3} readonly />
                  <Box marginRight="0.6rem" />
                  <Box>{'(34 ocen)'}</Box>
                </FlexBox>
              </Box>
            </FlexBox>
            <ReviewButton onClick={onAddReview}>
              <AiFillStar />
              <Box marginRight="0.25rem" />
              <Heading5 fontWeight={400}>Oceń pomysł</Heading5>
            </ReviewButton>
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
        <NewRatingModal
          ideaId={idea.id}
          ideaTitle={idea.title}
          isVisible={reviewModalOpened}
          onClose={() => setReviewModalOpened(false)}
        />
      )}
    </>
  );
};

export default IdeaCard;
