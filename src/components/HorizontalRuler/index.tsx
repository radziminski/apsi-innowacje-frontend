import styled from 'styled-components';

export const HorizontalRuler = styled.div`
  padding: ${({ theme }) => theme.spacing.s};
  margin-top: ${({ theme }) => theme.spacing.m};
  width: 100%;

  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
