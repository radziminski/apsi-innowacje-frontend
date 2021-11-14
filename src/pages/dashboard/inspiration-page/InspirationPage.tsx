import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { Inspiration } from './components/Inspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';
import { InspirationDetails } from '~/pages/dashboard/inspiration-page/InspirationDetails';
import { MARGINS } from '~/styles/variables';

export interface CommentModel {
  // TODO use proper DTO
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
        { author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' },
        { author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' }
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
      return true;
    },
    [inspirations]
  );

  const loader = (
    <div className="inspiration-list__loader" key={0}>
      Ładowanie...
    </div>
  );
  const errorComponent = <div>Wystąpił błąd podczas ładowania.</div>;

  const [InfiniteScrollWrapper, lastElementRef] = useInfiniteScroll(fetchData, loader, errorComponent);

  return (
    <FlexBox className={props.className}>
      <div className={'inspiration-list'}>
        <CreateInspiration />
        <InfiniteScrollWrapper>
          {inspirations.map((inspiration, index) => (
            <Inspiration
              key={inspiration.id}
              {...(inspirations.length === index + 1 ? { ref: lastElementRef } : {})}
              onClick={() => onInspirationClick(inspiration)}
              customClassName={`inspiration-list-item${
                chosenInspiration && chosenInspiration.id === inspiration.id ? '--chosen-inspiration' : ''
              }`}
              {...{ inspiration }}
            />
          ))}
        </InfiniteScrollWrapper>
      </div>
      <div className={`inspiration-details${isDetailsOpened ? '' : '--hidden'}`}>
        {chosenInspiration && <InspirationDetails inspiration={chosenInspiration} onClose={closeInspirationDetails} />}
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
  }

  .inspiration-list-item {
    box-shadow: 0 0 0 ${({ theme }) => theme.colors.primary}AF;
    transform: translate(0%, 0%);
    transition: 0.5s ease-in-out;

    &:hover {
      box-shadow: 2px 2px 0.2rem ${({ theme }) => theme.colors.primary}8F;
      transform: translate(-2%, -2%);
      transition: transform 0.5s ease-in-out;
    }
    &--chosen-inspiration,
    &--chosen-inspiration:hover {
      box-shadow: 2px 2px 0.2rem ${({ theme }) => theme.colors.primary}8F;
      transform: translate(-2%, -2%);
    }
  }
`;
