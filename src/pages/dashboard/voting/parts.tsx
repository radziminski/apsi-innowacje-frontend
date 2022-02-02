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

export const RatingButton = styled.button<{ isSelected?: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.primary)};
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadiuses.small};
  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryHover : theme.colors.primary)};
    border: 2px solid ${({ theme, isSelected }) => (isSelected ? theme.colors.primaryHover : theme.colors.primary)};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  right: 4rem;
  bottom: 4rem;
  z-index: ${({ theme }) => theme.zIndex.stickedFront};

  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.small};
  background: ${({ theme }) => theme.colors.primary};
  transition: all 0.2s;

  box-shadow: 0 0.4rem 0.7rem rgba(0, 0, 0, 0.18);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;
