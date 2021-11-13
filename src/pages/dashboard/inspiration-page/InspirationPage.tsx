import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { Inspiration } from './components/Inspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import styled from 'styled-components';
import { FlexBox } from '~/components/Box';

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
  upvotes: number;
  downvotes: number;
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
      upvotes: 10,
      downvotes: 5,
      comments: [{ author: { firstName: 'Jakiś', lastName: 'Hejter' }, content: 'Buuuu słabo' }]
    };
  }
}

const inspirationGenerator = inspirationGeneratorFn();

const InspirationPageBase = (props: InspirationPageProps) => {
  const [openedInspiration, setOpenedInspiration] = React.useState<InspirationModel | undefined>(undefined);
  const [inspirations, setInspirations] = React.useState<InspirationModel[]>([
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    inspirationGenerator.next().value!,
    inspirationGenerator.next().value!,
    inspirationGenerator.next().value!
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  ]);

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
              onClick={() => setOpenedInspiration(inspiration)}
              {...{ inspiration }}
            />
          ))}
        </InfiniteScrollWrapper>
      </div>
      <div className={`inspiration-details${openedInspiration ? '' : '--hidden'}`}>
        {openedInspiration && openedInspiration.id}
      </div>
    </FlexBox>
  );
};

export const InspirationPage = styled(InspirationPageBase)`
  .inspiration-list__loader {
    margin: ${({ theme }) => theme.margins.medium};
  }

  width: 100%;
  cursor: pointer;
  .inspiration-list {
    width: 100%;
  }
  .inspiration-details {
    transition: width 0.5s ease-in-out;
    width: 90%;
  }
  .inspiration-details--hidden {
    transition: width 0.5s ease-in-out;
    width: 0%;
  }
`;
