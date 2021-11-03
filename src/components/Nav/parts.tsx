import styled from 'styled-components';

export const Pill = styled.div<{ offset: number }>`
  width: 4px;
  height: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  position: absolute;
  right: 0;
  top: ${({ offset }) => offset}px;
  transition: top 0.1s ease-in-out;
`;
