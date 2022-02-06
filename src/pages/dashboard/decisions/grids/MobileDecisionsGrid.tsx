import Box, { FlexBox } from '~/components/Box';
import React from 'react';
import styled from 'styled-components';
import { Heading5 } from '~/components/Text';
import { HorizontalRuler } from '~/components/HorizontalRuler';
import { DecisionsGridCommonProps, IdeaRequiredId } from '~/pages/dashboard/decisions/DecisionsPage';
import { IdeaDto, IdeaDtoStatusEnum } from '~/api-client';
import { StatusBadge } from '~/pages/dashboard/decisions/components/StatusBadge';

export const MobileDecisionsGrid = styled((props: DecisionsGridCommonProps) => {
  const onRowClick = React.useCallback(
    (idea: IdeaDto) => {
      props.onIdeaClick(idea);
    },
    [props.onIdeaClick]
  );

  return (
    <div className={props.className}>
      <FlexBox className={'decisions-grid'} flexDirection={'column'}>
        {props.ideas
          .filter(idea => idea.id !== undefined)
          .map((idea, index, list) => (
            <FlexBox className={'decisions-grid__item'} key={index} flexDirection={'column'}>
              <div>
                <Heading5>Tytuł: </Heading5>
                <span onClick={() => onRowClick(idea)} className={'decisions-grid__item-title'}>
                  {idea.title === undefined ? 'Tytuł nieznany' : idea.title}
                </span>
              </div>
              <div>
                <Heading5>Ocena komisji: </Heading5>
                {idea.votesSum === undefined ? '-' : idea.votesSum}/
                {props.maxCommitteeScore === undefined ? '-' : props.maxCommitteeScore}
              </div>
              <div>
                <Heading5>Ocena użytkowników:</Heading5>
                {idea.rating || '-'}/5
              </div>
              <FlexBox alignItems={'center'} justifyContent={'flex-start'}>
                <Heading5>Decyzja: </Heading5>
                <FlexBox marginX={'0.5rem'} width={'100%'}>
                  {idea.status && <StatusBadge idea={idea as IdeaRequiredId} gridProps={props} />}
                </FlexBox>
              </FlexBox>
              {idea.status !== IdeaDtoStatusEnum.New && (
                <FlexBox style={{ marginTop: '0.5rem' }} justifyContent={'flex-start'}>
                  <Heading5 style={{ marginRight: '0.2rem' }}>Uzasadnienie: </Heading5>
                  <span>{idea.statusDescription !== undefined ? idea.statusDescription : 'Brak'}</span>
                </FlexBox>
              )}
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
  width: 100%;
  .decisions-grid {
    text-align: left;
    width: 100%;

    h5 {
      display: inline;
    }
    span {
      word-break: break-word;
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
  }
`;
