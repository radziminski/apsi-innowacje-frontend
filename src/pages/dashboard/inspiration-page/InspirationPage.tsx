import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import styled from 'styled-components';
import Box, { FlexBox } from '~/components/Box';
import { InspirationDetails } from '~/pages/dashboard/inspiration-page/InspirationDetails';
import { MARGINS } from '~/styles/variables';
import { CSSTransition } from 'react-transition-group';
import { Inspiration } from '~/pages/dashboard/inspiration-page/components/Inspiration';
import { useOutsideClick } from '~/hooks/useOutsideClick';

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

  const chosenInspirationRef = React.useRef<HTMLDivElement>();
  const inspirationDetailsRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick([chosenInspirationRef, inspirationDetailsRef], () => {
    isDetailsOpened && closeInspirationDetails();
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
      Ładowanie...
    </div>
  );
  const errorComponent = <div>Wystąpił błąd podczas ładowania.</div>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, isError, lastElementRef] = useInfiniteScroll(fetchData);

  return (
    <FlexBox className={props.className}>
      <div className={'inspiration-list'}>
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
          <div ref={inspirationDetailsRef}>
            <InspirationDetails inspiration={chosenInspiration} onClose={closeInspirationDetails} />
          </div>
        )}
      </div>
    </FlexBox>
  );
};

export const InspirationPage = styled(InspirationPageBase)`
  .inspiration-list__loader {
    margin: ${({ theme }) => theme.margins.medium};
  }

  width: 100%;

  .inspiration-details {
    margin-left: 0;
    margin-right: ${MARGINS.medium};
    transform: translateX(0%);
  }
  .inspiration-details--hidden {
    margin-left: -100%;
    transform: translateX(100%);
  }

  .inspiration-details,
  .inspiration-details--hidden {
    width: 100%;
    transition: 0.5s ease-in-out;
  }

  .inspiration-list {
    width: 100%;
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
