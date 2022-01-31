import styled from 'styled-components';

export const SubjectButton = styled.button<{ isSelected: boolean }>`
  padding: 0.8rem 1.8rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.primary)};
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadiuses.small};
  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryHover : 'transparent')};
    border: 2px solid ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.primaryHover)};
  }
`;
