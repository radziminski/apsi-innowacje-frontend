import React from 'react';
import { CreateInspiration } from '~/pages/dashboard/inspiration-page/CreateInspiration';
import { Inspiration } from './components/Inspiration';
import { useInfiniteScroll } from '~/hooks/useInfiniteScroll/useInfiniteScroll';

export interface InspirationModel {
  // TODO use proper DTO
  id: number;
  title: string;
  content: string;
}

let id = 3;

export const InspirationPage = () => {
  const [inspirations, setInspirations] = React.useState<InspirationModel[]>([
    { id: 0, title: 'aaaa', content: 'aaaa' },
    { id: 1, title: 'aaaa', content: 'aaaa' },
    { id: 2, title: 'aaaa', content: 'aaaa' }
  ]);

  const fetchData = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (page: number) => {
      // TODO fetch inspirations
      const newInspirations: InspirationModel[] = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: id++, title: 'aaaa', content: 'aaaa' },
            { id: id++, title: 'aaaa', content: 'aaaa' },
            { id: id++, title: 'aaaa', content: 'aaaa' }
          ]);
        }, 1000);
      });

      setInspirations(inspirations.concat(newInspirations));
      return true;
    },
    [inspirations]
  );

  const loader = (
    <div className="loader" key={0}>
      Ładowanie...
    </div>
  );
  const errorComponent = <div>Wystąpił błąd podczas ładowania.</div>;

  const [InfiniteScrollWrapper, lastElementRef] = useInfiniteScroll(fetchData, loader, errorComponent);

  return (
    <>
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
    </>
  );
};
