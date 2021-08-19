import { useMemo } from 'react';
import { INote } from '../types/note-types';

const useFilterPosts = (notes: INote[], tags: string[]) => {
  const filteredPosts = useMemo(() => {
    return notes.filter((note) => tags.every((tag) => note.tags.includes(tag)));
  }, [notes, tags]);

  return filteredPosts;
};

export default useFilterPosts;
