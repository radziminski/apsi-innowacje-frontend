import React from 'react';
import styled from 'styled-components';
import { Center, FlexBox } from '~/components/Box';
import { Heading6 } from '~/components/Text';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';
import { BsCircle, BsInfoCircle } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { DecisionDtoIdeaStatusEnum, IdeaDtoStatusEnum } from '~/api-client';
import { COLORS } from '~/styles/variables';
import { Button } from '~/components/Button';
import { DecisionsGridCommonProps, IdeaRequiredId } from '~/pages/dashboard/decisions/DecisionsPage';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { FormProvider, useForm } from 'react-hook-form';
import { FormRow } from '~/components/forms/FormRow';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const justificationSchema = yup.object({
  justification: yup.string().required('Proszę podać uzasadnienie')
});

interface JustificationFormSchema {
  justification: string;
}

const JustificationComponent = styled(
  (props: {
    decision: DecisionDtoIdeaStatusEnum;
    onConfirm: (data: JustificationFormSchema) => void;
    onClose: () => void;
    className?: string;
  }) => {
    const { decision, onConfirm, onClose } = props;
    const divRef = React.useRef<HTMLDivElement>(null);
    useOutsideClick(divRef, props.onClose);

    let buttonText;

    switch (decision) {
      case DecisionDtoIdeaStatusEnum.Accepted:
        buttonText = 'Akceptuj';
        break;
      case DecisionDtoIdeaStatusEnum.Rejected:
        buttonText = 'Odrzuć';
        break;
      case DecisionDtoIdeaStatusEnum.PutAway:
        buttonText = 'Odłóż';
        break;
      case DecisionDtoIdeaStatusEnum.ReuqestForDetails:
        buttonText = 'Przekaż do uzupełnienia';
        break;
      default:
        buttonText = 'Potwierdź';
    }

    const methods = useForm({
      resolver: yupResolver(justificationSchema)
    });

    return (
      <FlexBox className={props.className} ref={divRef}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onConfirm)}>
            <FormRow
              type="textarea"
              placeholder="Tekst uzasadnienia"
              label={'Uzasadnienie'}
              required
              inputWidth={'80%'}
              labelWidth={'20%'}
              rows={4}
              id={'justification'}
            />
            <FlexBox justifyContent={'flex-end'}>
              <Button type={'button'} onClick={onClose}>
                Anuluj
              </Button>
              <Button type={'submit'} primary>
                {buttonText}
              </Button>
            </FlexBox>
          </form>
        </FormProvider>
      </FlexBox>
    );
  }
)`
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.stickedFront};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.primary}5A;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadiuses.small};
  padding: ${({ theme }) => theme.spacing.xs};
  transform: translate(-30%, 60%);
  // right: 4.5rem;
  max-width: 80vw;
  width: 600px;

  @media only screen and (max-width: 760px) {
    right: -4rem;
  }
  form {
    width: 100%;
  }
  button + button {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const DecisionContextMenu = styled(
  (props: {
    idea: IdeaRequiredId;
    onClose: () => void;
    onDecisionClick: (decision: DecisionDtoIdeaStatusEnum) => void;
    className?: string;
  }) => {
    const { idea, onClose, onDecisionClick } = props;

    const divRef = React.useRef<HTMLDivElement>(null);
    useOutsideClick(divRef, onClose);

    return (
      <FlexBox className={props.className} ref={divRef}>
        {idea.status && idea.status !== IdeaDtoStatusEnum.Accepted && (
          <Button
            className={'button-accept'}
            onClick={e => {
              e.stopPropagation();
              onDecisionClick(DecisionDtoIdeaStatusEnum.Accepted);
            }}>
            Akceptuj
          </Button>
        )}
        {idea.status && idea.status !== IdeaDtoStatusEnum.Rejected && (
          <Button
            className={'button-decline'}
            onClick={e => {
              e.stopPropagation();
              onDecisionClick(DecisionDtoIdeaStatusEnum.Rejected);
            }}>
            Odrzuć
          </Button>
        )}
        {idea.status && idea.status !== IdeaDtoStatusEnum.PutAway && (
          <Button
            className={'button-put-away'}
            onClick={e => {
              e.stopPropagation();
              onDecisionClick(DecisionDtoIdeaStatusEnum.PutAway);
            }}>
            Odłóż
          </Button>
        )}
        {idea.status && idea.status !== IdeaDtoStatusEnum.ReuqestForDetails && (
          <Button
            className={'button-request-for-details'}
            onClick={e => {
              e.stopPropagation();
              onDecisionClick(DecisionDtoIdeaStatusEnum.ReuqestForDetails);
            }}
            primary>
            Poproś o szczegóły
          </Button>
        )}
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
  transform: translate(0, 63%);
  max-width: 80vw;

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
  (props: { idea: IdeaRequiredId; gridProps: DecisionsGridCommonProps; className?: string }) => {
    const [decisionMenuDisplayed, setDecisionMenuDisplayed] = React.useState<boolean>(false);
    const [justificationContextMenuDisplayed, setJustificationContextMenuDisplayed] = React.useState<boolean>(false);
    const [chosenDecision, setChosenDecision] = React.useState<DecisionDtoIdeaStatusEnum | null>(null);

    const status = props.idea.status;

    const onDecisionClick = React.useCallback((decision: DecisionDtoIdeaStatusEnum) => {
      setDecisionMenuDisplayed(false);
      setJustificationContextMenuDisplayed(true);
      setChosenDecision(decision);
    }, []);

    const onConfirmDecision = React.useCallback(
      (data: JustificationFormSchema) => {
        if (chosenDecision) {
          props.gridProps.onDecision(props.idea, {
            ideaStatus: chosenDecision,
            description: data.justification
          });
        }
        setChosenDecision(null);
        setJustificationContextMenuDisplayed(false);
      },
      [props.idea, props.gridProps, chosenDecision]
    );

    const onEllipsisClick = React.useCallback(() => {
      if (justificationContextMenuDisplayed) {
        setJustificationContextMenuDisplayed(false);
      } else {
        setDecisionMenuDisplayed(!decisionMenuDisplayed);
      }
    }, [decisionMenuDisplayed, justificationContextMenuDisplayed]);

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
          <IoEllipsisVertical className={'status-badge__menu'} onClick={onEllipsisClick} />
        </FlexBox>
        {decisionMenuDisplayed && (
          <DecisionContextMenu
            idea={props.idea}
            onDecisionClick={onDecisionClick}
            onClose={() => setDecisionMenuDisplayed(false)}
          />
        )}
        {justificationContextMenuDisplayed && chosenDecision && (
          <JustificationComponent
            decision={chosenDecision}
            onConfirm={(data: JustificationFormSchema) => {
              onConfirmDecision(data);
            }}
            onClose={() => setJustificationContextMenuDisplayed(false)}
          />
        )}
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
