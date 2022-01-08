import styled from 'styled-components';
import Box from '../Box';
import { Button } from '../Button';

export const OptionsGrid = styled(Box)`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
`;

export const OptionButton = styled(Button)`
  margin: 1rem;
`;

export const VotingConsole = styled(Box)`
  height: 500px;
  position: sticky;
  top: 0;
`;
