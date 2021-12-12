import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { PageableApiArgs } from '~/store/store';

export const useAsyncInfiniteScroll = (
  fetchFn: (pageNum?: number) => Promise<boolean>
): [boolean, boolean, (node: HTMLElement | null) => void] => {
  const [isLoading, setIsLoading] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isError, setError] = React.useState<any>(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [shouldFetch, setShouldFetch] = React.useState(true);

  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setShouldFetch(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, observer]
  );

  React.useEffect(() => {
    if (shouldFetch) {
      setIsLoading(true);
      setError(null);
      setShouldFetch(false);
      try {
        fetchFn()
          .then(hasMore => setHasMore(hasMore))
          .then(() => setIsLoading(false));
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    }
  }, [shouldFetch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [isLoading, isError, lastElementRef];
};

export const useReduxInfiniteScroll = <
  T extends { isLoading: boolean; isError: boolean; currentPage: number },
  ApiArgs extends PageableApiArgs,
  // eslint-disable-next-line @typescript-eslint/ban-types
  State extends {}
>(
  dispatchActionFn: (
    args: Required<Pick<ApiArgs, 'page' | 'count'>> | Omit<Partial<ApiArgs>, 'page' | 'count'>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => AsyncThunkAction<unknown, Partial<ApiArgs>, any>,
  selector: (state: State) => T,
  pageSize: number,
  restDispatchArgs?: Omit<ApiArgs, 'page' | 'count'>
): [boolean, boolean, (node: HTMLElement | null) => void] => {
  const { isLoading, isError, currentPage } = useSelector<State, T>(selector);
  const dispatch = useDispatch();
  // TODO get has_more from api by checking the total count
  const [hasMore, setHasMore] = React.useState(true);
  const [shouldFetch, setShouldFetch] = React.useState(true);

  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setShouldFetch(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, observer]
  );

  React.useEffect(() => {
    if (!isLoading) {
      setShouldFetch(false);
      dispatch(dispatchActionFn({ ...(restDispatchArgs || {}), page: currentPage, count: pageSize }));
      setHasMore(true);
    }
  }, [shouldFetch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [isLoading, isError, lastElementRef];
};
