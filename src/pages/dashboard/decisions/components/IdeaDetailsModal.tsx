import React from 'react';
import styled from 'styled-components';
import { Heading3, Paragraph } from '~/components/Text';
import CommonModal from '~/components/CommonModal';
import { IdeaDto, UserDto } from '~/api-client';
import Box, { FlexBox } from '~/components/Box';
import { useSelector } from '~/store/hooks';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '~/store/slices/CreateUserSlice';

interface IdeaDetailsModalProps {
  idea: IdeaDto | null;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}
export const IdeaDetailsModal = styled((props: IdeaDetailsModalProps) => {
  const [author, setAuthor] = React.useState<UserDto | null | undefined>(null);
  const { allUsers, isLoadingAllUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const onCloseModal = React.useCallback(() => {
    if (props.isVisible) {
      props.onClose();
    }
  }, [props.isVisible, props.onClose]);

  React.useEffect(() => {
    if (!allUsers && !isLoadingAllUsers) {
      dispatch(getAllUsers());
    }
  }, []);

  React.useEffect(() => {
    if (allUsers) {
      setAuthor(allUsers.find(user => user.id === props.idea?.authorId));
    }
  }, [allUsers, props.idea]);

  return (
    <CommonModal isVisible={props.isVisible} onClose={onCloseModal}>
      {props.idea && (
        <div className={props.className}>
          <Heading3 textAlign="center">{`Szczegóły pomysłu ${
            props.idea.title ? `„${props.idea.title}"` : 'o nieznanym tytule'
          }`}</Heading3>
          <FlexBox className={'idea-details'}>
            <div>
              <Paragraph fontWeight={500}>Opis:</Paragraph>
              {props.idea.description ? props.idea.description : 'Brak opisu'}
            </div>
            <div>
              <Paragraph fontWeight={500}>Korzyści:</Paragraph>
              {props.idea.benefits
                ? props.idea.benefits.map(benefit => (
                    <Box key={benefit.id} paddingY="0.25rem" display={'inline'}>
                      {benefit.description}
                    </Box>
                  ))
                : 'Nieznane'}
            </div>
            <div>
              <Paragraph fontWeight={500}>Koszty:</Paragraph>
              {props.idea.costs
                ? props.idea.costs.map(
                    ({ value }, i) => value + (i !== (props.idea?.costs?.length || 0) - 1 ? 'zł - ' : 'zł')
                  )
                : 'Nieznane'}
            </div>
            <div>
              <Paragraph fontWeight={500}>Autor:</Paragraph>
              {props.idea.anonymous
                ? 'Anonimowy'
                : author === null
                ? '...'
                : author === undefined
                ? 'Nieznany'
                : `${author.firstName}  ${author.lastName}`}
            </div>
          </FlexBox>
        </div>
      )}
    </CommonModal>
  );
})`
  h3 {
    margin-bottom: 1rem;
  }
  .idea-details {
    flex-direction: column;

    p {
      display: inline;
      margin-right: 0.2rem;
    }

    > div + div {
      margin-top: 1rem;
    }
  }
`;
