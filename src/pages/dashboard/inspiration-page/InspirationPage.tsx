import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import styled from 'styled-components';
import Box, { FlexBox } from '~/components/Box';
import { Inspiration } from '~/pages/dashboard/inspiration-page/components/Inspiration';

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
            <Inspiration
              key={inspiration.id}
              inspiration={inspiration}
              ref={ref => {
                if (inspirations.length === index + 1) {
                  lastElementRef(ref);
                }
              }}
              customClassName={'inspiration-list-item'}
            />
          ))}
        </Box>
        {isLoading && loader}
        {isError && errorComponent}
      </div>
    </FlexBox>
  );
};

export const InspirationPage = styled(InspirationPageBase)`
  width: 100%;

  .inspiration-list__loader {
    margin: ${({ theme }) => theme.margins.medium};
  }

  .inspiration-list {
    width: 100%;
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
