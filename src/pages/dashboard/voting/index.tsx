/* eslint-disable */
import React, { Suspense, useState } from 'react';
import { MdOutlineRateReview } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import 'suneditor/dist/css/suneditor.min.css';
import { CenteredLoader } from '~/components/Loader';
import Box, { FlexBox } from '~/components/Box';
import VotingOptions from '~/components/VotingOptions';
import VotingList from '~/components/VotingList';
import { Heading3 } from '~/components/Text';
import { VotingConsole } from '~/components/VotingOptions/parts';
import { Button } from '~/components/Button';
import { IdeaDtoStatusEnum } from '~/api-client';
import { TextInput } from '~/components/forms/FormTextInput/TextInput';

export const VotingPage: React.FC = () => {
  const SunEditor = React.lazy(() => import('suneditor-react'));

  const [selectedIdea, setSelectedIdea] = useState<number | undefined>(undefined);
  const [explenation, setExplenation] = useState('');
  const [votedOption, setVotedOption] = useState<null | IdeaDtoStatusEnum>(null);

  const selectIdea = (ideaId: number | undefined) => {
    setSelectedIdea(ideaId);
  };

  const voteOption = (option: IdeaDtoStatusEnum) => {
    setVotedOption(option);
  };

  const vote = () => {};

  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      <FlexBox>
        <Box>
          <VotingList select={selectIdea} />
        </Box>
        <VotingConsole>
          <VotingOptions voteOption={voteOption} selected={votedOption} />
          <Heading3>Wyjasnienie:</Heading3>
          <TextInput />
          <FlexBox justifyContent="flex-end">
            <Button text={'Zaglosuj'} onClick={vote} />
          </FlexBox>
        </VotingConsole>
      </FlexBox>
    </DashboardContent>
  );
};

export default VotingPage;
