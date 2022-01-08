import React from 'react';
import { IdeaDtoStatusEnum } from '~/api-client';
import Box from '../Box';
import { Heading3 } from '../Text';
import { OptionsGrid, OptionButton } from './parts';

interface Props {
  voteOption: (option: IdeaDtoStatusEnum) => void;
  selected: IdeaDtoStatusEnum | null;
}

const VotingOptions: React.FC<Props> = ({ voteOption, selected }) => {
  return (
    <Box>
      <Heading3>Decyzja:</Heading3>
      <OptionsGrid>
        <OptionButton
          text={'Accept'}
          onClick={() => voteOption(IdeaDtoStatusEnum.Accepted)}
          primary={selected === IdeaDtoStatusEnum.Accepted}
        />
        <OptionButton
          text={'Put away'}
          onClick={() => voteOption(IdeaDtoStatusEnum.PutAway)}
          primary={selected === IdeaDtoStatusEnum.PutAway}
        />
        <OptionButton
          text={'Request details'}
          onClick={() => voteOption(IdeaDtoStatusEnum.ReuqestForDetails)}
          primary={selected === IdeaDtoStatusEnum.ReuqestForDetails}
        />
        <OptionButton
          text={'Reject '}
          onClick={() => voteOption(IdeaDtoStatusEnum.Rejected)}
          primary={selected === IdeaDtoStatusEnum.Rejected}
        />
      </OptionsGrid>
    </Box>
  );
};

export default VotingOptions;
