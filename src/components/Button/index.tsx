import styled from 'styled-components';
import { COLORS, MARGINS } from '~/styles/variables';
import React from 'react';

export interface ButtonProps {
  className?: string;
  text: string;
  type?: string;
  onClick?: (e) => void;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const ButtonBase = (props: ButtonProps & any): JSX.Element => {
  const { className, text, ...rest } = props;
  return (
    <div className={className} {...rest}>
      <button
        onClick={
          rest.onClick
            ? rest.onClick
            : () => {
                /*Do nothing*/
              }
        }
        type={rest.type || ''}>
        {text}
      </button>
    </div>
  );
};

export const Button = styled(ButtonBase)`
  text-align: right;
  button {
    background-color: ${COLORS.lightGray};
    border-radius: 999px;
    margin: ${MARGINS.small};
    padding: ${MARGINS.small} ${MARGINS.medium};
    &:hover {
      background-color: ${COLORS.primary};
    }
    &:active {
      background-color: ${COLORS.accent3};
    }
  }

  button,
  button:active,
  button:hover {
    transition: background-color 0.2s ease-in-out;
  }
`;
