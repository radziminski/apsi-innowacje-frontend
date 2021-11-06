import styled, { DefaultTheme, withTheme } from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import { COLORS } from '~/styles/variables';
import React from 'react';

interface RemoveFileModalProps {
  handleChoice: (confirmDelete: boolean) => void;
  filename: string;
  theme: DefaultTheme;
  className?: string;
}

const RemoveFileModalBase = (props: RemoveFileModalProps) => {
  return (
    <Center className={props.className}>
      <span>Czy na pewno chcesz usunąć plik {props.filename}?</span>
      <FlexBox>
        <Button
          theme={{ ...props.theme, colors: { ...props.theme.colors, lightGray: COLORS.darkGray } } as DefaultTheme}
          onClick={() => props.handleChoice(true)}
          text={'Tak'}
          id={'remove_file-modal__yes-button'}
        />
        <Button onClick={() => props.handleChoice(false)} text={'Anuluj'} id={'remove_file-modal__cancel-button'} />
      </FlexBox>
    </Center>
  );
};

export const RemoveFileModal = withTheme(styled(RemoveFileModalBase)`
  max-width: 50%;
  min-height: 20%;
  flex-direction: column;

  span {
    margin: ${({ theme }) => theme.margins.medium} ${({ theme }) => theme.margins.small};
  }

  > div {
    align-self: flex-end;
  }

  #remove_file-modal__yes-button,
  #remove_file-modal__cancel-button {
    align-self: flex-end;
  }
`);
