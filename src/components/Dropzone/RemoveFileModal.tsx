import styled, { DefaultTheme, withTheme } from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import { COLORS } from '~/styles/variables';
import React from 'react';
import { ModalWindow } from '~/components/ModalWindow';

interface RemoveFileModalProps {
  handleChoice: (confirmDelete: boolean) => void;
  filename: string;
  theme: DefaultTheme;
  className?: string;
}

const RemoveFileModalBase = (props: RemoveFileModalProps) => {
  return (
    <ModalWindow>
      <Center className={props.className}>
        <span>Czy na pewno chcesz usunąć plik {props.filename}?</span>
        <FlexBox>
          <Button
            theme={{ ...props.theme, colors: { ...props.theme.colors, lightGray: COLORS.darkGray } } as DefaultTheme}
            onClick={() => props.handleChoice(true)}
            text={'Tak'}
          />
          <Button onClick={() => props.handleChoice(false)} text={'Anuluj'} />
        </FlexBox>
      </Center>
    </ModalWindow>
  );
};

export const RemoveFileModal = withTheme(styled(RemoveFileModalBase)`
  max-width: 50%;
  min-height: 20%;
  flex-direction: column;

  // span {
  //   margin: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.s};
  // }

  > div {
    align-self: flex-end;
    margin-top: ${({ theme }) => theme.spacing.m};
  }

  button {
    align-self: flex-end;
  }

  button + button {
    margin-left: ${({ theme }) => theme.spacing.s};
  }
`);
