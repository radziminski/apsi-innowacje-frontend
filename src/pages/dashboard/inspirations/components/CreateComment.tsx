import React from 'react';
import { FlexBox } from '~/components/Box';
import styled from 'styled-components';
import { Paragraph } from '~/components/Text';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '~/components/Button';
import { FormTextArea } from '~/components/forms/FormTextArea';
import { CreatePostAnswerDto } from '~/api-client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { createCommentAndThenUpdateInspiration } from '~/store/slices/CreateInspirationsSlice';

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
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isCreateCommentSuccess = useSelector((state: RootState) => state.inspirations.isCreateCommentSuccess);

  const handleUserKeyPress = React.useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter' && event.ctrlKey) {
      methods.handleSubmit(onSubmit)();
    }
  }, []);

  React.useEffect(() => {
    if (isCreateCommentSuccess) {
      methods.reset();
    }
  }, [isCreateCommentSuccess]);

  const onSubmit = React.useCallback(
    async (data: CommentSchema) => {
      if (currentUser && currentUser.id) {
        const formData = {
          text: data.comment,
          postId: props.inspirationId
        } as Required<CreatePostAnswerDto>;
        dispatch(createCommentAndThenUpdateInspiration(formData));
      }
    },
    [props.inspirationId, currentUser]
  );

  return (
    <FormProvider {...methods}>
      <FlexBox className={props.className}>
        <Paragraph className={'create-comment__title'}>Dodaj komentarz:</Paragraph>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FlexBox className={'create-comment__form-container'}>
            <FormTextArea
              id={'comment'}
              rows={6}
              style={{ fontSize: '0.8rem' }}
              onKeyPress={handleUserKeyPress}
              placeholder={'Treść komentarza'}
            />
            <Button text={'Dodaj'} type={'submit'} primary />
          </FlexBox>
        </form>
      </FlexBox>
    </FormProvider>
  );
})`
  flex-direction: column;
  // box-shadow: 0 0 0.15rem #00000082;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  padding: 5px;
  margin: ${({ theme }) => theme.spacing.s} 0;
  form {
    width: 100%;
  }
  .create-comment__form-container {
    flex-direction: column;
  }
  .create-comment__title {
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
  textarea {
    margin: 5px 0;
    width: 100%;
  }
  button {
    align-self: flex-end;
    padding: 0.7rem ${({ theme }) => theme.spacing.m};
  }
`;
