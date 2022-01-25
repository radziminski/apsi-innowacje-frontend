import Box, { FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import React from 'react';
import styled from 'styled-components';
import { Heading5 } from '~/components/Text';
import { HorizontalRuler } from '~/components/HorizontalRuler';
import { DecisionsGridCommonProps } from '~/pages/dashboard/decisions/DecisionsPage';
import { useIdeasGrid } from '~/pages/dashboard/decisions/grids/useIdeasGrid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MobileDecisionsGridProps extends DecisionsGridCommonProps {}

export const MobileDecisionsGrid = styled((props: MobileDecisionsGridProps) => {
  const [onClickAccept, onClickDecline, onRowClick] = useIdeasGrid(props);

  return (
    <div className={props.className}>
      <FlexBox className={'decisions-grid'} flexDirection={'column'}>
        {props.ideas.map((idea, index, list) => (
          <FlexBox
            className={'decisions-grid__item'}
            key={index}
            flexDirection={'column'}
            onClick={() => onRowClick(idea)}>
            <div>
              <Heading5 style={{ display: 'inline' }}>Tytuł:</Heading5>
              <span className={'decisions-grid__item-title'}> Tabelka z ratingiem i możliwościami Accept/Decline</span>
            </div>
            <div>
              <Heading5 style={{ display: 'inline' }}>Ocena komisji:</Heading5> {idea.votesSum}/
              {props.maxCommitteeScore}
            </div>
            <div>
              <Heading5 style={{ display: 'inline' }}>Ocena użytkowników:</Heading5> 4.5/5
            </div>
            <FlexBox alignItems={'center'} justifyContent={'flex-start'}>
              <Heading5 style={{ display: 'inline' }}>Decyzja: </Heading5>
              <Button
                className={'button-accept'}
                onClick={e => {
                  e.stopPropagation();
                  onClickAccept(idea);
                }}>
                Akceptuj
              </Button>
              <Button
                className={'button-decline'}
                onClick={e => {
                  e.stopPropagation();
                  onClickDecline(idea);
                }}>
                Odrzuć
              </Button>
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

    .decisions-grid__item:hover {
      cursor: pointer;
    }
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
