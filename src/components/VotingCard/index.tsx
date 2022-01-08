import React from 'react';
import styled from 'styled-components';
import { IdeaDto } from '~/api-client';
import Box, { Card, FlexBox } from '../Box';
import { Heading4, Paragraph } from '../Text';

interface Props {
  idea: IdeaDto;
  select: (ideaId: number | undefined) => void;
}

const VotingBase: React.FC<Props> = ({ idea, select }) => {
  return (
    <Card onClick={() => select(idea.id)}>
      <FlexBox flexDirection="column" width="100%">
        <Box paddingBottom="1rem" overflow="hidden">
          <Heading4 fontSize="1.35rem" fontWeight={500}>
            {idea.title ?? 'Nieznany tytuł'}
          </Heading4>
        </Box>
        <Box paddingBottom="1rem" overflow="hidden">
          <Paragraph>{idea.description}</Paragraph>
        </Box>
      </FlexBox>
    </Card>
  );
};

export const VotingCard = styled(VotingBase)`
  cursor: pointer;
`;

export default VotingCard;
