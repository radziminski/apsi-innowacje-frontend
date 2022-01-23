import Box, { FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import React from 'react';
import styled from 'styled-components';
import { Heading5 } from '~/components/Text';
import { HorizontalRuler } from '~/components/HorizontalRuler';

export const MobileDecisionsGrid = styled((props: { className?: string }) => {
  return (
    <div className={props.className}>
      <FlexBox className={'decisions-grid'} flexDirection={'column'}>
        {Array(4)
          .fill(1)
          .map((el, index, list) => (
            <FlexBox className={'decisions-grid__item'} key={index} flexDirection={'column'}>
              <div>
                <Heading5 style={{ display: 'inline' }}>Tytuł:</Heading5>
                <span className={'decisions-grid__item-title'}>
                  {' '}
                  Tabelka z ratingiem i możliwościami Accept/Decline
                </span>
              </div>
              <div>
                <Heading5 style={{ display: 'inline' }}>Ocena komisji:</Heading5> Tabelka z ratingiem i możliwościami
                Accept
              </div>
              <div>
                <Heading5 style={{ display: 'inline' }}>Ocena użytkowników:</Heading5> Tabelka z ratingiem i
                możliwościami Accept/Decline
              </div>
              <FlexBox alignItems={'center'} justifyContent={'flex-start'}>
                <Heading5 style={{ display: 'inline' }}>Decyzja: </Heading5>
                <Button className={'button-accept'}>Akceptuj</Button>
                <Button className={'button-decline'}>Odrzuć</Button>
              </FlexBox>
              {index !== list.length - 1 && (
                <>
                  <Box padding={'0.5rem 0'} />
                  <HorizontalRuler />
                  <Box padding={'0.5rem 0'} />
                </>
              )}
            </FlexBox>
          ))}
      </FlexBox>
    </div>
  );
})`
  .decisions-grid {
    max-width: 100%;
    text-align: left;
    width: 100%;

    .decisions-grid__item > div {
      padding-bottom: 0.5rem;
    }

    .decisions-grid__item-title {
      text-decoration: underline;
      &:hover {
        cursor: pointer;
      }
    }
    .button-accept,
    .button-decline {
      height: 1rem;
      width: 100%;
      min-width: 0;
      max-width: 130px;
      margin-left: 0.5rem;
    }

    .button-accept {
      background-color: ${({ theme }) => theme.colors.accent4};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: #009730;
      }

      &:active {
        background-color: #006725;
      }
    }

    .button-decline {
      background-color: #ff0000;
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: #dd0000;
      }

      &:active {
        background-color: #bb0000;
      }
    }
  }
`;
