import styled from 'styled-components';
import { MOBILE_NAVBAR_HEIGHT } from '../MobileNavBar';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;

  @media ${({ theme }) => theme.mediaQueries.tab} {
    padding: 3rem 2rem;
    height: unset;
    overflow-y: unset;
    overflow-x: unset;
    padding-top: calc(${MOBILE_NAVBAR_HEIGHT}px + 3rem);
  }
`;
