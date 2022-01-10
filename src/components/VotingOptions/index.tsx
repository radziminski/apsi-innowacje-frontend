import React from 'react';
import { DecisionDtoIdeaStatusEnum } from '~/api-client';
import { FlexBox } from '../Box';
import { Heading3 } from '../Text';
import { OptionsGrid, OptionButton } from './parts';

interface Props {
  voteOption: (option: DecisionDtoIdeaStatusEnum) => void;
  selected: DecisionDtoIdeaStatusEnum | undefined;
}

const VotingOptions: React.FC<Props> = ({ voteOption, selected }) => {
  return (
    <FlexBox justifyContent="center">
      <Heading3>Decyzja:</Heading3>
      <OptionsGrid>
        <OptionButton
          text={'Accept'}
          onClick={() => voteOption(DecisionDtoIdeaStatusEnum.Accepted)}
          primary={selected === DecisionDtoIdeaStatusEnum.Accepted}
        />
        <OptionButton
          text={'Put away'}
          onClick={() => voteOption(DecisionDtoIdeaStatusEnum.PutAway)}
          primary={selected === DecisionDtoIdeaStatusEnum.PutAway}
        />
        <OptionButton
          text={'Request details'}
          onClick={() => voteOption(DecisionDtoIdeaStatusEnum.ReuqestForDetails)}
          primary={selected === DecisionDtoIdeaStatusEnum.ReuqestForDetails}
        />
        <OptionButton
          text={'Reject '}
          onClick={() => voteOption(DecisionDtoIdeaStatusEnum.Rejected)}
          primary={selected === DecisionDtoIdeaStatusEnum.Rejected}
        />
      </OptionsGrid>
    </FlexBox>
  );
};

export default VotingOptions;
