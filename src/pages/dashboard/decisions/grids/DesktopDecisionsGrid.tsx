import { FlexBox } from '~/components/Box';
import React from 'react';
import styled from 'styled-components';
import { Heading4, Heading5 } from '~/components/Text';
import { DecisionsGridCommonProps, IdeaRequiredId } from '~/pages/dashboard/decisions/DecisionsPage';
import { StatusBadge } from '~/pages/dashboard/decisions/components/StatusBadge';
import { IdeaDto, IdeaDtoStatusEnum } from '~/api-client';

export const DesktopDecisionsGrid = styled((props: DecisionsGridCommonProps) => {
  const onRowClick = React.useCallback(
    (idea: IdeaDto) => {
      props.onIdeaClick(idea);
    },
    [props.onIdeaClick]
  );

  const CommitteeVotes = React.useMemo(
    () =>
      ({ idea }) =>
        (
          <div>
            {props.isOthersCategory ? (
              <>
                {idea.votesSum === undefined ? '-' : idea.votesSum}/
                {idea.rejectsSum === undefined ? '-' : idea.rejectsSum}/
                {props.maxCommitteeScore === undefined
                  ? '-'
                  : props.maxCommitteeScore -
                    (idea.votesSum === undefined ? 0 : idea.votesSum) -
                    (idea.rejectsSum === undefined ? 0 : idea.rejectsSum)}
              </>
            ) : (
              <>
                {idea.votesSum === undefined ? '-' : idea.votesSum}/
                {props.maxCommitteeScore === undefined ? '-' : props.maxCommitteeScore}
              </>
            )}
          </div>
        ),
    [props.maxCommitteeScore, props.isOthersCategory]
  );

  return (
    <div className={props.className}>
      <table className={'decisions-grid'}>
        <colgroup>
          <col style={{ width: props.isOthersCategory ? '30%' : '36%' }} />
          <col style={{ width: props.isOthersCategory ? '21%' : '15%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '27%' }} />
        </colgroup>
        <thead>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Tytuł pomysłu</Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>
              {props.isOthersCategory ? 'Głosy komisji (TAK / NIE / BRAK GŁOSU)' : 'Ocena komisji'}
            </Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Ocena użytkowników</Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Decyzja</Heading4>
          </th>
        </thead>
        <tbody>
          {props.ideas
            .filter(idea => idea.id !== undefined)
            .map((idea, index) => (
              <tr key={index} onClick={() => onRowClick(idea)}>
                <td style={{ textAlign: 'left' }}>
                  <div>{idea.title || 'Tytuł nieznany'}</div>
                </td>
                <td>
                  <CommitteeVotes idea={idea} />
                </td>

                <td>
                  <div>{idea.rating || '-'}/5</div>
                </td>

                <td>
                  <FlexBox flexDirection={'column'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                    {idea.status && <StatusBadge idea={idea as IdeaRequiredId} gridProps={props} />}
                    {idea.status && idea.status !== IdeaDtoStatusEnum.New && (
                      <div style={{ textAlign: 'left', alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                        <Heading5>Uzasadnienie:</Heading5>
                        <span>{idea.statusDescription !== undefined ? idea.statusDescription : 'Brak'}</span>
                      </div>
                    )}
                  </FlexBox>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
})`
  table.decisions-grid {
    border-collapse: collapse;
    max-width: 100%;
    text-align: center;
    table-layout: fixed;
    width: 100%;
    h5 {
      margin-right: 0.2rem;
      display: inline-block;
    }
    span {
      word-break: break-word;
    }
    th {
      text-align: center;
    }
    .decisions-grid__table-heading {
      padding-bottom: ${({ theme }) => theme.spacing.s};
    }
    td {
      padding: 0.5rem 0;
      + td {
        padding-left: 0.5rem;
      }
    }
    th + th {
      padding-left: 0.5rem;
    }
    tr:hover {
      &:hover {
        cursor: pointer;
      }
      background-color: #eee;
    }
  }
`;
