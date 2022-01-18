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
import { DecisionDto, DecisionDtoIdeaStatusEnum, IdeaDtoStatusEnum } from '~/api-client';
import { TextInput } from '~/components/forms/FormTextInput/TextInput';
import { voteIdea } from '~/store/slices/CreateVoteSlice';
import { useDispatch } from 'react-redux';
import { getIdeas } from '~/store/slices/CreateIdeasSlice';

export const VotingPage: React.FC = () => {
  const SunEditor = React.lazy(() => import('suneditor-react'));

  const [selectedIdea, setSelectedIdea] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [votedOption, setVotedOption] = useState<DecisionDtoIdeaStatusEnum | undefined>(undefined);
  const dispatch = useDispatch();

  const selectIdea = (ideaId: number | undefined) => {
    setSelectedIdea(ideaId);
  };

  const changeDescription = e => {
    setDescription(e.target.value);
  };

  const voteOption = (option: DecisionDtoIdeaStatusEnum) => {
    setVotedOption(option);
  };

  const vote = () => {
    if (selectedIdea && votedOption) {
      dispatch(voteIdea({ ideaId: selectedIdea, decision: { ideaStatus: votedOption, description } }));
      dispatch(getIdeas());
      setSelectedIdea(undefined);
      setVotedOption(undefined);
      setDescription('');
    }
  };

  return (
    <DashboardContent title="Głosowanie na pomysły" icon={<MdOutlineRateReview size={28} />}>
      <FlexBox>
        <Box width="900px">
          <VotingList select={selectIdea} selectedIdeaId={selectedIdea} />
        </Box>
        <VotingConsole marginLeft="2rem">
          <VotingOptions voteOption={voteOption} selected={votedOption} />
          <Heading3>Wyjasnienie:</Heading3>
          <Box margin=".7rem 0">
            <TextInput onChange={changeDescription} value={description} />
          </Box>
          <FlexBox justifyContent="flex-end" margin=".7rem 0">
            <Button text={'Zaglosuj'} onClick={vote} />
          </FlexBox>
        </VotingConsole>
      </FlexBox>
    </DashboardContent>
  );
};

export default VotingPage;
