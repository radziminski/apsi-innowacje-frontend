import styled from 'styled-components';

export const Container = styled.div<{ isActive?: boolean; isDisabled?: boolean }>`
  display: flex;
  transition: color 0.2s;
  align-items: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : 'inherit')};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
