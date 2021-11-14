import styled from 'styled-components';

export const HorizontalRuler = styled.div`
  padding: ${({ theme }) => theme.margins.small};
  margin-top: ${({ theme }) => theme.margins.medium};
  width: 100%;

  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
