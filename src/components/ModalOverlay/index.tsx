import styled from 'styled-components';

export const ModalOverlay = styled.div<{ isVisible: boolean | null }>`
  position: fixed;
  display: ${props => (props.isVisible !== null ? 'block' : 'none')};
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.modalBack};
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: ${({ onClick, isVisible }) => (onClick && isVisible ? 'pointer' : 'auto')};
  transition: all 0.2s;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)}; ;
`;
