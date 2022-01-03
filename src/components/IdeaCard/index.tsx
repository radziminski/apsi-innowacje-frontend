import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IdeaDto } from '~/api-client';
import Box, { Card, FlexBox } from '../Box';
import RatingModal from '../RatingModal';
import { Heading4, Heading5, Heading6, Paragraph } from '../Text';
import { ReviewButton } from './parts';

interface Props {
  idea: IdeaDto;
}
export const IdeaCard: React.FC<Props> = ({ idea }) => {
  const [reviewModalOpened, setReviewModalOpened] = useState(false);

  const onAddReview = () => {
    // todo
    setReviewModalOpened(true);
  };

  return (
    <>
      <Card>
        <FlexBox flexDirection="column">
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

            <ReviewButton onClick={onAddReview}>
              <AiFillStar />
              <Box marginRight="0.25rem" />
              <Heading5 fontWeight={400}>Oceń pomysł</Heading5>
            </ReviewButton>
          </FlexBox>
          <Box paddingBottom="0.5rem" />
          <Heading4 fontSize="1.35rem" fontWeight={500}>
            {idea.title ?? 'Nieznany tytuł'}
          </Heading4>
          <Box paddingBottom="1rem" />
          <Paragraph>{idea.description}</Paragraph>
          <Box paddingBottom="1rem" />

          {idea.costs && (
            <Heading6 fontWeight={400} fontSize="0.75rem">
              Koszt: {idea.costs.map(cost => cost + ' | ')}
            </Heading6>
          )}
          {idea.keywords}
        </FlexBox>
      </Card>
      {idea && idea.id && (
        <RatingModal
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
