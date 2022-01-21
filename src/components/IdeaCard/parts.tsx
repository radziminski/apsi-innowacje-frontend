import styled from 'styled-components';

export const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.2s;
  padding: 0.25rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
