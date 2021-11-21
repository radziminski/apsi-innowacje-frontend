import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { BiMessageDetail } from 'react-icons/bi';
import { CreateInspiration } from '~/pages/dashboard/inspirations/CreateInspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspirations/components/AuthorInfo';
import Box, { FlexBox } from '~/components/Box';
import { InspirationDetails } from '~/pages/dashboard/inspirations/InspirationDetails';
import { Inspiration } from '~/pages/dashboard/inspirations/components/Inspiration';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import useDevice from '~/hooks/useDevice';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import { CenteredLoader } from '~/components/Loader';

export interface CommentModel {
  // TODO use proper DTO
  id: number;
  author: AuthorInfo;
  content: string;
}

export interface InspirationModel {
  // TODO use proper DTO
  id: number;
  content: string;
  author: AuthorInfo;
  // upvotes: number;
  // downvotes: number;
  comments: CommentModel[];
}

interface InspirationPageProps {
  className?: string;
}

const HAS_MORE = true;

function* inspirationGeneratorFn() {
  let id = 0;

  while (true) {
    yield {
      id: id++,
      content: 'aaaa',
      author: { firstName: 'Michal', lastName: 'Belniak' },
      // upvotes: 10,
      // downvotes: 5,
      comments: [
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { id: id++, author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' }
      ]
    };
  }
}

const inspirationGenerator = inspirationGeneratorFn();

const InspirationPageBase = (props: InspirationPageProps) => {
  const [chosenInspiration, setChosenInspiration] = React.useState<InspirationModel | undefined>(undefined);
  const [isDetailsOpened, setIsDetailsOpened] = React.useState<boolean>(false);
  const [inspirations, setInspirations] = React.useState<InspirationModel[]>([
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    inspirationGenerator.next().value!,
    inspirationGenerator.next().value!,
    inspirationGenerator.next().value!
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  ]);
  const { isTab } = useDevice();

  const chosenInspirationRef = React.useRef<HTMLDivElement>();
  const inspirationDetailsRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick([chosenInspirationRef, inspirationDetailsRef], () => {
    isDetailsOpened && !isTab && closeInspirationDetails();
  });

  const closeInspirationDetails = React.useCallback(() => {
    setIsDetailsOpened(false);
    setTimeout(() => setChosenInspiration(undefined), 500);
  }, []);

  const onInspirationClick = React.useCallback((inspiration: InspirationModel) => {
    setChosenInspiration(inspiration);
    setIsDetailsOpened(true);
  }, []);

  const fetchData = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (page: number) => {
      // TODO fetch inspirations
      const newInspirations: InspirationModel[] = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            inspirationGenerator.next().value!,
            inspirationGenerator.next().value!,
            inspirationGenerator.next().value!
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
          ]);
        }, 1000);
      });

      setInspirations(inspirations.concat(newInspirations));
      return HAS_MORE;
    },
    [inspirations]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loader = (
    <div className="inspiration-list__loader" key={0}>
      <CenteredLoader />
    </div>
  );
  const errorComponent = <div>Wystąpił błąd podczas ładowania.</div>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, isError, lastElementRef] = useInfiniteScroll(fetchData);

  return (
    <DashboardContent title="Portal Inspiracji" icon={<BiMessageDetail size={28} />}>
      <FlexBox className={props.className}>
        <div className={`inspiration-list${isDetailsOpened && isTab ? '--hidden' : ''}`}>
          <CreateInspiration />
          <Box>
            {inspirations.map((inspiration, index) => (
              <CSSTransition
                in={chosenInspiration === inspiration}
                key={inspiration.id}
                timeout={500}
                classNames="inspiration-list-item">
                <Inspiration
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
        </div>
        <div className={`inspiration-details${isDetailsOpened ? '' : '--hidden'}`}>
          {chosenInspiration && (
            <FlexBox ref={inspirationDetailsRef}>
              <InspirationDetails
                inspiration={chosenInspiration}
                onClose={closeInspirationDetails}
                isOpened={isDetailsOpened}
              />
            </FlexBox>
          )}
        </div>
      </FlexBox>
    </DashboardContent>
  );
};

export const InspirationPage = styled(InspirationPageBase)`
  width: 100%;

  .inspiration-list__loader {
    margin: ${({ theme }) => theme.margins.medium};
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
    top: 0;
    width: 100%;
    height: 100vh;
    transition: 0.5s ease-in-out;
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
