import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { BiMessageDetail } from 'react-icons/bi';
import { CreateInspiration } from '~/pages/dashboard/inspirations/create-inspiration/CreateInspiration';
import { useReduxInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import Box, { Center, FlexBox } from '~/components/Box';
import { InspirationDetails } from '~/pages/dashboard/inspirations/InspirationDetails';
import { InspirationCard } from '~/pages/dashboard/inspirations/components/InspirationCard';
import useDevice from '~/hooks/useDevice';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { CenteredLoader } from '~/components/Loader';
import AsyncContentContainer from '~/components/AsyncContentContainer';
import { useSelector } from '~/store/hooks';
import { RootState } from '~/store/store';
import {
  deleteCommentAndThenUpdateInspiration,
  deleteInspiration,
  getInspirations
} from '~/store/slices/CreateInspirationsSlice';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import ConfirmModal from '~/components/ConfirmModal';

interface InspirationsPageProps {
  className?: string;
}

const PAGE_SIZE = 8;

export const DeleteIconComponent = styled((props: { onDeleteClick: (e) => void; className?: string }) => (
  <>
    <Box
      className={props.className}
      as="button"
      transform="scale(1.3)"
      marginTop={'-5px'}
      paddingLeft="0.5rem"
      onClick={e => props.onDeleteClick(e)}>
      <MdDeleteForever />
    </Box>
  </>
))`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  transition: all 0.3s;
`;

const InspirationsPageBase = (props: InspirationsPageProps) => {
  const [chosenInspirationId, setChosenInspirationId] = React.useState<number | undefined>(undefined);
  const [isDetailsOpened, setIsDetailsOpened] = React.useState<boolean>(false);
  const [deleteInspirationModalVisible, setDeleteInspirationModalVisible] = React.useState<boolean>(false);
  const [deleteCommentModalVisible, setDeleteCommentModalVisible] = React.useState<boolean>(false);
  const inspirationIdToDelete = React.useRef<number | null>(null);
  const commentIdToDelete = React.useRef<number | null>(null);
  const { inspirations, isDeletingInspirationSuccess } = useSelector(state => state.inspirations);
  const { isWideTab } = useDevice();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isDeletingInspirationSuccess === true) {
      setChosenInspirationId(undefined);
      setIsDetailsOpened(false);
    }
  }, [isDeletingInspirationSuccess]);

  const onDeleteComment = React.useCallback((commentId: number) => {
    setDeleteCommentModalVisible(true);
    commentIdToDelete.current = commentId;
  }, []);

  const onDeleteCommentModalConfirm = React.useCallback(() => {
    if (commentIdToDelete.current !== null && chosenInspirationId !== undefined) {
      dispatch(
        deleteCommentAndThenUpdateInspiration({
          commentId: commentIdToDelete.current,
          inspirationId: chosenInspirationId
        })
      );
    }
    setDeleteCommentModalVisible(false);
  }, [commentIdToDelete.current]);

  const onCloseDeleteCommentModal = React.useCallback(() => {
    commentIdToDelete.current = null;
    setDeleteCommentModalVisible(false);
  }, []);

  const onDeleteInspirationClick = React.useCallback((e, inspirationId: number | null | undefined) => {
    e.stopPropagation();
    if (inspirationId) {
      inspirationIdToDelete.current = inspirationId;
      setDeleteInspirationModalVisible(true);
    }
  }, []);

  const onDeleteInspirationModalConfirm = React.useCallback(() => {
    if (inspirationIdToDelete.current !== null) {
      dispatch(deleteInspiration(inspirationIdToDelete.current));
    }
    setDeleteInspirationModalVisible(false);
  }, [inspirationIdToDelete.current]);

  const onCloseDeleteInspirationModal = React.useCallback(() => {
    inspirationIdToDelete.current = null;
    setDeleteInspirationModalVisible(false);
  }, []);

  const closeInspirationDetails = React.useCallback(() => {
    setIsDetailsOpened(false);
    setTimeout(() => setChosenInspirationId(undefined), 500);
  }, []);

  const onInspirationClick = React.useCallback((inspirationId: number) => {
    setChosenInspirationId(inspirationId);
    setIsDetailsOpened(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loader = (
    <div className="inspiration-list__loader" key={0}>
      <CenteredLoader />
    </div>
  );
  const errorComponent = <Center>Wystąpił błąd podczas ładowania.</Center>;

  const noMoreComponent = <Center>Wyświetlono już wszystkie posty.</Center>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, isError, hasMore, lastElementRef] = useReduxInfiniteScroll(
    getInspirations,
    (state: RootState) => state.inspirations,
    PAGE_SIZE
  );

  return (
    <DashboardContent title="Portal Inspiracji" icon={<BiMessageDetail size={28} />}>
      <AsyncContentContainer
        isLoading={inspirations === null && isLoading}
        isError={inspirations === null && isError}
        errorMessage="Wystąpił błąd z odświeżaniem pomysłów.">
        {inspirations && (
          <FlexBox className={props.className}>
            <ConfirmModal
              title={'Czy na pewno chcesz usunąć tę inspirację?'}
              onConfirm={onDeleteInspirationModalConfirm}
              onClose={onCloseDeleteInspirationModal}
              isVisible={deleteInspirationModalVisible}
            />
            <ConfirmModal
              title={'Czy na pewno chcesz usunąć ten komentarz?'}
              onConfirm={onDeleteCommentModalConfirm}
              onClose={onCloseDeleteCommentModal}
              isVisible={deleteCommentModalVisible}
            />
            <div className={`inspiration-list${isDetailsOpened && isWideTab ? '--hidden' : ''}`}>
              <CreateInspiration />
              <Box>
                {inspirations.map((inspiration, index) =>
                  inspiration.id ? (
                    <CSSTransition
                      in={chosenInspirationId === inspiration.id}
                      key={inspiration.id}
                      timeout={500}
                      classNames="inspiration-list-item">
                      <InspirationCard
                        inspiration={inspiration}
                        onClick={() => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          onInspirationClick(inspiration.id!);
                        }}
                        deleteComponent={
                          <DeleteIconComponent onDeleteClick={e => onDeleteInspirationClick(e, inspiration.id)} />
                        }
                        ref={ref => {
                          if (inspirations.length === index + 1) {
                            lastElementRef(ref);
                          }
                        }}
                        customClassName={'inspiration-list-item'}
                      />
                    </CSSTransition>
                  ) : null
                )}
              </Box>
              {isLoading && loader}
              {!isLoading && isError && errorComponent}
              {hasMore || isLoading || noMoreComponent}
            </div>
            <div className={`inspiration-details${isDetailsOpened ? '' : '--hidden'}`}>
              {chosenInspirationId && (
                <FlexBox>
                  <InspirationDetails
                    inspirationId={chosenInspirationId}
                    onClose={closeInspirationDetails}
                    isOpened={isDetailsOpened}
                    deleteComponent={
                      <DeleteIconComponent onDeleteClick={e => onDeleteInspirationClick(e, chosenInspirationId)} />
                    }
                    onDeleteComment={onDeleteComment}
                  />
                </FlexBox>
              )}
            </div>
          </FlexBox>
        )}
      </AsyncContentContainer>
    </DashboardContent>
  );
};

export const InspirationsPage = styled(InspirationsPageBase)`
  width: auto;

  .inspiration-list__loader {
    margin: ${({ theme }) => theme.spacing.m};
  }

  .inspiration-details {
    margin-left: 0;
    transform: translateX(0%);
  }
  .inspiration-details--hidden {
    margin-left: -100%;
    transform: translateX(100%);
  }

  .inspiration-details,
  .inspiration-details--hidden {
    position: sticky;
    top: -${({ theme }) => theme.spacing.xxl};
    width: 100%;
    max-height: 100vh;
    transition: 0.5s ease-in-out;

    @media ${({ theme }) => theme.mediaQueries.tab} {
      top: 8rem;
      max-height: 80vh;
      margin-bottom: -100%;
    }
  }

  .inspiration-list--hidden {
    margin-left: -100%;
    transform: translateX(-100%);
  }

  .inspiration-list,
  .inspiration-list--hidden {
    width: 100%;
    transition: 0.5s ease-in-out;
  }

  .inspiration-list-item {
    &-enter-active,
    &-enter-active:hover,
    &-enter-done,
    &-enter-done:hover {
      transform: translate(-3px, -3px);
      box-shadow: 2px 2px 0.5rem ${({ theme }) => theme.colors.primary}8F;
    }

    &-exit-active,
    &-exit-active:hover {
      transform: translate(0, 0);
      transition: transform 0.2s ease-out;
    }
  }

  .inspiration-list-item {
    transition: 0.3s ease-in-out;
  }
  .inspiration-list-item:hover {
    transform: translate(-3px, -3px);
    box-shadow: 2px 2px 0.5rem ${({ theme }) => theme.colors.primary}8F;
    transition: 0.2s ease-in-out;
  }
`;
