import { FlexBox } from '~/components/Box';
import { Button } from '~/components/Button';
import React from 'react';
import styled from 'styled-components';
import { Heading4 } from '~/components/Text';

export const DesktopDecisionsGrid = styled((props: { className?: string }) => {
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
          {Array(4)
            .fill(1)
            .map((el, index) => (
              <tr key={index}>
                <td className={'decisions-grid__idea-title'}>
                  <div>Tabelka z ratingiem i możliwościami Accept/Decline</div>
                </td>
                <td>
                  <div>4.5/5</div>
                </td>

                <td>
                  <div>25/50</div>
                </td>

                <td>
                  <FlexBox flexDirection={'column'}>
                    <div>
                      <Button className={'button-accept'}>Akceptuj</Button>
                    </div>
                    <div>
                      <Button className={'button-decline'}>Odrzuć</Button>
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
    &:hover {
      cursor: pointer;
    }
    .decisions-grid__table-heading {
      padding-bottom: ${({ theme }) => theme.spacing.s};
    }
    td {
      padding-top: 1rem;
      + td {
        padding-left: 0.5rem;
      }
    }
    th + th {
      padding-left: 0.5rem;
    }
    tr:hover {
      background-color: #eee;
    }
    .button-accept,
    .button-decline {
      height: 1rem;
      margin-bottom: ${({ theme }) => theme.spacing.xs};
      width: 100%;
      min-width: 0;
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
