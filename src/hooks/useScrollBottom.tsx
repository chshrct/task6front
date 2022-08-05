import { useCallback, useEffect } from 'react';

import { PersonType } from 'store/api/types';

const PAGE_SIZE = 10;

export const useScrollBottom = (
  isFetching: boolean,
  pagesData: PersonType[] | undefined,
  getPage: any,
  countryCode: string,
  errors: number,
  seed: number,
): void => {
  const handleScroll = useCallback((): void => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching ||
      !pagesData
    )
      return;
    getPage({
      countryCode,
      errors,
      pageOrder: pagesData.length / PAGE_SIZE + 1,
      seed,
    });
  }, [countryCode, errors, seed, getPage, isFetching, pagesData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};
