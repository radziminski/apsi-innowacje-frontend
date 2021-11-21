import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4rem 3.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;

  @media ${({ theme }) => theme.mediaQueries.tab} {
    padding: 3rem 2rem;
  }
`;
