import React from 'react';

export const useInfiniteScroll = (
  fetchFn: (pageNum: number) => Promise<boolean>
): [boolean, boolean, (node: HTMLElement | null) => void] => {
  const [isLoading, setIsLoading] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isError, setError] = React.useState<any>(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [pageNum, setPageNum] = React.useState(1);

  const observer = React.useRef<IntersectionObserver>();
  const lastElementRef = React.useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, observer]
  );

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      fetchFn(pageNum)
        .then(hasMore => setHasMore(hasMore))
        .then(() => setIsLoading(false));
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  }, [pageNum]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [isLoading, isError, lastElementRef];
};
