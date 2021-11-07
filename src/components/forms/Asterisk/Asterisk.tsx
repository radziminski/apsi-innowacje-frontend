import React from 'react';
import styled from 'styled-components';

export const Asterisk = styled((props: { className?: string }) => <span className={props.className}>*</span>)`
  color: ${({ theme }) => theme.colors.error};
  padding-top: 5px;
`;
