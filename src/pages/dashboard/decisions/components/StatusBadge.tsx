import React from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Heading6 } from '~/components/Text';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';
import { BsCircle, BsInfoCircle } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { IdeaDto, IdeaDtoStatusEnum } from '~/api-client';
import { COLORS } from '~/styles/variables';
import { Button } from '~/components/Button';
import { useIdeasDecisionsGrid } from '~/pages/dashboard/decisions/grids/useIdeasDecisionsGrid';
import { DecisionsGridCommonProps } from '~/pages/dashboard/decisions/DecisionsPage';
import { useOutsideClick } from '~/hooks/useOutsideClick';

const DecisionContextMenu = styled(
  (props: { gridProps: DecisionsGridCommonProps; idea: IdeaDto; onClose: () => void; className?: string }) => {
    const { gridProps, idea } = props;
    const [onClickAccept, onClickDecline, onPutAway, onRequestForDetails] = useIdeasDecisionsGrid(gridProps);
    const divRef = React.useRef<HTMLDivElement>(null);
    useOutsideClick(divRef, props.onClose);

    return (
      <FlexBox className={props.className} ref={divRef}>
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
        <Button
          className={'button-put-away'}
          onClick={e => {
            e.stopPropagation();
            onPutAway(idea);
          }}>
          Odłóż
        </Button>
        <Button
          className={'button-request-for-details'}
          onClick={e => {
            e.stopPropagation();
            onRequestForDetails(idea);
          }}>
          Poproś o szczegóły
        </Button>
      </FlexBox>
    );
  }
)`
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.stickedBack};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.primary}5A;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadiuses.small};
  padding: ${({ theme }) => theme.spacing.xs};
  transform: translate(-90%, 1.5rem);
  // right: 4.5rem;

  animation: appear 0.3s;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  button[class*='button'] {
    height: 1.2rem;
    width: 130px;

    + button {
      margin-top: ${({ theme }) => theme.spacing.xs};
    }
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
`;

export const StatusBadge = styled(
  (props: { idea: IdeaDto; gridProps: DecisionsGridCommonProps; className?: string }) => {
    const [decisionMenuDisplayed, setDecisionMenuDisplayed] = React.useState<boolean>(false);
    const status = props.idea.status;
    let text;
    switch (status) {
      case IdeaDtoStatusEnum.Accepted:
        text = 'Zaakceptowany';
        break;
      case IdeaDtoStatusEnum.Rejected:
        text = 'Odrzucony';
        break;
      case IdeaDtoStatusEnum.PutAway:
        text = 'Odłożony';
        break;
      case IdeaDtoStatusEnum.ReuqestForDetails:
        text = 'Prośba o szczegóły';
        break;
      default:
        text = 'Brak decyzji';
    }
    return (
      <Center className={props.className} onClick={e => e.stopPropagation()}>
        <Center width={'100%'}>
          {status === IdeaDtoStatusEnum.Accepted ? (
            <FcCheckmark color={COLORS.accent4} />
          ) : status === IdeaDtoStatusEnum.Rejected ? (
            <AiOutlineClose color={'red'} />
          ) : status === IdeaDtoStatusEnum.PutAway ? (
            <AiOutlineClockCircle color={COLORS.primary} />
          ) : status === IdeaDtoStatusEnum.ReuqestForDetails ? (
            <BsInfoCircle color={COLORS.gray} />
          ) : (
            <BsCircle color={COLORS.lightGray} />
          )}
          <Heading6>{text}</Heading6>
        </Center>
        <FlexBox>
          <IoEllipsisVertical
            className={'status-badge__menu'}
            onClick={() => setDecisionMenuDisplayed(!decisionMenuDisplayed)}
          />
          {decisionMenuDisplayed && (
            <DecisionContextMenu
              gridProps={props.gridProps}
              idea={props.idea}
              onClose={() => setDecisionMenuDisplayed(false)}
            />
          )}
        </FlexBox>
      </Center>
    );
  }
)`
  background-color: white;
  border: 2px solid
    ${({ idea, theme }) =>
      idea.status === IdeaDtoStatusEnum.Accepted
        ? theme.colors.accent4
        : idea.status === IdeaDtoStatusEnum.Rejected
        ? 'red'
        : idea.status === IdeaDtoStatusEnum.PutAway
        ? theme.colors.primary
        : idea.status === IdeaDtoStatusEnum.ReuqestForDetails
        ? theme.colors.gray
        : theme.colors.lightGray};
  width: 160px;
  border-radius: 999px;
  height: 30px;
  svg {
    margin-right: 0.3rem;
    ${({ idea }) => (idea.status === IdeaDtoStatusEnum.Accepted ? 'transform: translateY(-1px);' : '')}
  }
  &:hover {
    cursor: auto;
  }
  .status-badge__menu:hover {
    cursor: pointer;
  }
`;
