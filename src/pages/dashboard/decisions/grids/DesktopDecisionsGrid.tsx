import { FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import React from 'react';
import styled from 'styled-components';
import { Heading4 } from '~/components/Text';
import { DecisionsGridCommonProps } from '~/pages/dashboard/decisions/DecisionsPage';
import { useIdeasGrid } from '~/pages/dashboard/decisions/grids/useIdeasGrid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DesktopDecisionsGridProps extends DecisionsGridCommonProps {}

export const DesktopDecisionsGrid = styled((props: DesktopDecisionsGridProps) => {
  const [onClickAccept, onClickDecline, onRowClick] = useIdeasGrid(props);

  return (
    <div className={props.className}>
      <table className={'decisions-grid'}>
        <colgroup>
          <col style={{ width: '35%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Tytuł pomysłu</Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Ocena komisji</Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Ocena użytkowników</Heading4>
          </th>
          <th>
            <Heading4 className={'decisions-grid__table-heading'}>Decyzja</Heading4>
          </th>
        </thead>
        <tbody>
          {props.ideas.map((idea, index) => (
            <tr key={index} onClick={() => onRowClick(idea)}>
              <td className={'decisions-grid__idea-title'}>
                <div>{idea.title}</div>
              </td>
              <td>
                <div>
                  {idea.votesSum}/{props.maxCommitteeScore}
                </div>
              </td>

              <td>
                <div>4.5/5</div>
              </td>

              <td>
                <FlexBox flexDirection={'column'}>
                  <div>
                    <Button
                      className={'button-accept'}
                      onClick={e => {
                        e.stopPropagation();
                        onClickAccept(idea);
                      }}>
                      Akceptuj
                    </Button>
                  </div>
                  <div>
                    <Button
                      className={'button-decline'}
                      onClick={e => {
                        e.stopPropagation();
                        onClickDecline(idea);
                      }}>
                      Odrzuć
                    </Button>
                  </div>
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
    text-align: left;
    table-layout: fixed;
    width: 100%;
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
    .button-accept,
    .button-decline {
      height: 1rem;
      width: 100%;
      min-width: 0;
    }

    .button-accept {
      background-color: ${({ theme }) => theme.colors.accent4};
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: ${({ theme }) => theme.spacing.xs};

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
