import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '~/components/Button';
import { FormTextArea } from '~/components/forms/FormTextArea';
import apiClient, { CreatePostDto } from '~/api-client';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const schema = yup
  .object({
    comment: yup.string().required('Proszę wpisać komentarz.')
  })
  .required();

interface CommentSchema {
  comment: string;
}

interface CreateCommentProps {
  inspirationId: number;
  className?: string;
}

export const CreateComment = styled((props: CreateCommentProps) => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const onSubmit = React.useCallback(
    async (data: CommentSchema) => {
      // eslint-disable-next-line no-console
      console.log(data);
      if (currentUser && currentUser.id) {
        // setIsLoading(true);
        const formData = {
          text: data.comment,
          postId: props.inspirationId
        } as CreatePostDto;
        try {
          const response: AxiosResponse<number> = await apiClient.postCreatePostAnswerPost(formData);
          if ([200, 201].includes(response.status)) {
            // setRequestStatus('success');
            // eslint-disable-next-line no-console
            console.log(response);
          } else {
            // TODO proper error handling
            // setRequestStatus('error');
          }
        } catch (e) {
          // setRequestStatus('error');
        }
        return;
      }
    },
    [props.inspirationId, currentUser]
  );
  return (
    <FormProvider {...methods}>
      <FlexBox className={props.className}>
        <Paragraph>Dodaj komentarz:</Paragraph>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FlexBox className={'create-comment__form-container'}>
            <FormTextArea id={'comment'} rows={1} />
            <Button text={'Dodaj'} type={'submit'} primary />
          </FlexBox>
        </form>
      </FlexBox>
    </FormProvider>
  );
})`
  flex-direction: column;
  box-shadow: 0 0 0.15rem #00000082;
  border-radius: 5px;
  padding: 5px;
  margin: ${({ theme }) => theme.spacing.s} 0;
  form {
    width: 100%;
  }
  .create-comment__form-container {
    flex-direction: column;
  }
  textarea {
    margin: 5px 0;
    width: 100%;
  }
  button {
    align-self: flex-end;
  }
`;
