import styled from 'styled-components';

export const Container = styled.div<{ isActive?: boolean }>`
  display: flex;
  transition: color 0.2s;
  align-items: center;
  cursor: pointer;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : 'inherit')};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
