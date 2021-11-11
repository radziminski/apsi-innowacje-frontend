import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { Inspiration } from './components/Inspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';
import { AuthorInfo } from '~/pages/dashboard/inspiration-page/components/AuthorInfo';
import styled from 'styled-components';

export interface InspirationModel {
  // TODO use proper DTO
  id: number;
  content: string;
  author: AuthorInfo;
}

interface InspirationPageProps {
  className?: string;
}

let id = 3;

const InspirationPageBase = (props: InspirationPageProps) => {
  const [inspirations, setInspirations] = React.useState<InspirationModel[]>([
    { id: 0, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } },
    { id: 1, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } },
    { id: 2, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } }
  ]);

  const fetchData = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (page: number) => {
      // TODO fetch inspirations
      const newInspirations: InspirationModel[] = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: id++, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } },
            { id: id++, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } },
            { id: id++, content: 'aaaa', author: { firstName: 'Michal', lastName: 'Belniak' } }
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
    <div className={props.className}>
      <CreateInspiration />
      <InfiniteScrollWrapper>
        {inspirations.map((inspiration, index) => (
          <Inspiration
            key={inspiration.id}
            {...(inspirations.length === index + 1 ? { ref: lastElementRef } : {})}
            {...{ inspiration }}
          />
        ))}
      </InfiniteScrollWrapper>
    </div>
  );
};

export const InspirationPage = styled(InspirationPageBase)`
  .inspiration-list__loader {
    margin: ${({ theme }) => theme.margins.medium};
  }
`;
