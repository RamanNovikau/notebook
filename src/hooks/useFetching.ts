import { useState } from 'react';

export const useFetching = (
  callback: (...args: any[]) => void
): [(...args: any[]) => void, boolean, string] => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const fetching = (...args: any[]) => {
    try {
      setIsFetching(true);
      callback([...args]);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsFetching(false);
    }
  };

  return [fetching, isFetching, error];
};
