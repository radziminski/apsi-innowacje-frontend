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
import { PostDto } from '~/api-client';
import { RootState } from '~/store/store';
import { getInspirations } from '~/store/slices/CreateInspirationsSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface InspirationsPageProps {
  className?: string;
}

const PAGE_SIZE = 8;

const InspirationsPageBase = (props: InspirationsPageProps) => {
  const [chosenInspiration, setChosenInspiration] = React.useState<PostDto | undefined>(undefined);
  const [isDetailsOpened, setIsDetailsOpened] = React.useState<boolean>(false);
  const { inspirations } = useSelector(state => state.inspirations);

  const { isWideTab } = useDevice();

  const chosenInspirationRef = React.useRef<HTMLDivElement>();

  const closeInspirationDetails = React.useCallback(() => {
    setIsDetailsOpened(false);
    setTimeout(() => setChosenInspiration(undefined), 500);
  }, []);

  const onInspirationClick = React.useCallback((inspiration: PostDto) => {
    setChosenInspiration(inspiration);
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
            <ToastContainer />
            <div className={`inspiration-list${isDetailsOpened && isWideTab ? '--hidden' : ''}`}>
              <CreateInspiration />
              <Box>
                {inspirations.map((inspiration, index) => (
                  <CSSTransition
                    in={chosenInspiration === inspiration}
                    key={inspiration.id}
                    timeout={500}
                    classNames="inspiration-list-item">
                    <InspirationCard
                      inspiration={inspiration}
                      onClick={() => {
                        onInspirationClick(inspiration);
                      }}
                      ref={ref => {
                        if (inspirations.length === index + 1) {
                          lastElementRef(ref);
                        }
                        if (inspiration === chosenInspiration) {
                          chosenInspirationRef.current = ref || undefined;
                        }
                      }}
                      customClassName={'inspiration-list-item'}
                    />
                  </CSSTransition>
                ))}
              </Box>
              {isLoading && loader}
              {isError && errorComponent}
              {hasMore || noMoreComponent}
            </div>
            <div className={`inspiration-details${isDetailsOpened ? '' : '--hidden'}`}>
              {chosenInspiration && (
                <FlexBox>
                  <InspirationDetails
                    inspiration={chosenInspiration}
                    onClose={closeInspirationDetails}
                    isOpened={isDetailsOpened}
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
  .Toastify__toast-container--top-right {
    top: 9rem;
  }

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
