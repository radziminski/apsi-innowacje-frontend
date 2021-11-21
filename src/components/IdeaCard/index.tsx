import React from 'react';
import { IdeaDto } from '~/api-client';
import Box, { Card, FlexBox } from '../Box';
import { Heading4, Heading6, Paragraph } from '../Text';

interface Props {
  idea: IdeaDto;
}
export const IdeaCard: React.FC<Props> = ({ idea }) => {
  return (
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
  );
};

export default IdeaCard;
