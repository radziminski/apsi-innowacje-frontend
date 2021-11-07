import React from 'react';
import { Center, FlexBox } from '~/components/Box';
import { FormTextInput } from '~/components/forms/FormTextInput';
import styled from 'styled-components';
import { FormComponentProps } from '~/components/forms';

const CreateIdeaValueRangeComponentBase = (props: FormComponentProps) => {
  return (
    <FlexBox className={props.className}>
      <FormTextInput {...props} id={'costs_from'} placeholder={'50'} type={'number'} />
      <FlexBox className={'value-range_dash-container'}>
        <span className={'value-range_dash'}>-</span>
      </FlexBox>
      <FormTextInput {...props} id={'costs_to'} placeholder={'100'} type={'number'} />
      <Center className={'value-range_currency-box'}>PLN</Center>
    </FlexBox>
  );
};

export const CreateIdeaValueRangeComponent = styled(CreateIdeaValueRangeComponentBase)`
  align-items: flex-start;
  width: 100%;

  .value-range_dash-container {
    height: 100%;
    flex-direction: column;
  }
  .value-range_dash {
    margin: 11px 5px;
    align-self: flex-start;
  }

  .value-range_currency-box {
    align-self: flex-start;

    color: ${({ theme }) => theme.colors.darkGray};
    box-shadow: 0 0 0.1rem ${({ theme }) => theme.colors.primaryDark};
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.lightGray};
    height: 43px;
    width: 20%;
    min-width: 3rem;
    margin: 0 5px;
  }
`;
