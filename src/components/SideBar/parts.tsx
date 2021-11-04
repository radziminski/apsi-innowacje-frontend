import styled from 'styled-components';

export const Container = styled.aside<{ isOpened: boolean }>`
  display: flex;
  width: 380px;
  padding: 4rem 0;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.mediaQueries.tab} {
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.2s ease-in-out;
    transform: ${({ isOpened }) => (isOpened ? 'translateX(0%)' : 'translateX(-100%)')};
    z-index: ${({ theme }) => theme.zIndex.modalFront};
  }
`;
