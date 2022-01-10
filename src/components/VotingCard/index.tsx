import React from 'react';
import styled from 'styled-components';
import { IdeaDto } from '~/api-client';
import { COLORS } from '~/styles/variables';
import Box, { Card, FlexBox } from '../Box';
import { Heading4, Paragraph } from '../Text';

interface Props {
  idea: IdeaDto;
  select: (ideaId: number | undefined) => void;
  isSelected: boolean;
}

const VotingBase: React.FC<Props> = ({ idea, select, isSelected }) => {
  return (
    <Card onClick={() => select(idea.id)} border={isSelected ? `1px solid ${COLORS.primary}` : ''} cursor="pointer">
      <FlexBox flexDirection="column" width="100%">
        <Box paddingBottom="1rem" overflow="hidden">
          <Heading4 fontSize="1.35rem" fontWeight={500}>
            {idea.title ?? 'Nieznany tytuł'}
          </Heading4>
        </Box>
        <Box paddingBottom="1rem" overflow="hidden">
          <Paragraph>{idea.description}</Paragraph>
        </Box>
        <FlexBox justifyContent="flex-end" color={COLORS.primary}>
          Status: {idea.status}
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

export const VotingCard = styled(VotingBase)`
  cursor: pointer;
`;

export default VotingCard;
