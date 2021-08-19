import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import PostNoteForm from '../PostNoteForm';
import FilterNoteForm from '../FilterNoteForm';
import { useFetching } from '../../hooks/useFetching';
import NoteService from '../../Services/NoteService';
import { INote } from '../../types/note-types';
import {
  highlightHashTag,
  handleHashTags,
  plainHashTags,
} from '../../utils/hashTags';
import { Note } from '../Note/Note';

import classes from './NoteBook.module.scss';
import useFilterPosts from '../../hooks/useFilterPosts';

export const NoteBook = () => {
  const [notes, setNotes] = useState<INote[]>([] as INote[]);
  const [value, setValue] = useState<string>('');

  const [filterTags, setFilterTags] = useState([] as string[]);

  const filteredNotes = useFilterPosts(notes, filterTags);

  const [getNotes] = useFetching(() => {
    const result = NoteService.getNotes();
    setNotes(result);
  });

  const [saveNotes] = useFetching(() => {
    NoteService.saveNotes(notes);
  });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes, saveNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(highlightHashTag(e.target.value));
  };

  const addNote = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setNotes([
      ...notes,
      { id: nanoid(), text: value, tags: handleHashTags(value) },
    ]);
  };

  const deleteNote = (note: INote) => {
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  const removeTag = (noteId: string, tag: string) => {
    setNotes(
      notes.map((n) => {
        if (n.id === noteId) {
          const plainText = plainHashTags(n.text);
          n.text = highlightHashTag(
            plainText.replaceAll(tag, ` ${tag.split('#')[1]}`)
          );
          n.tags = n.tags.filter(
            (t) => t.toLocaleLowerCase() !== tag.toLocaleLowerCase()
          );
        }
        return n;
      })
    );
  };

  const changeNote = (note: INote, text: string) => {
    const plainText = plainHashTags(text);

    setNotes(
      notes.map((n) => {
        if (n.id === note.id) {
          n.text = highlightHashTag(plainText);
          n.tags = handleHashTags(plainText);
        }
        return n;
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <PostNoteForm changeHandler={handleChange} addHandler={addNote} />
      <FilterNoteForm setFilterTags={setFilterTags} />
      <div className={classes.notebook}>
        {filteredNotes.map((note) => {
          return (
            <Note
              note={note}
              key={note.id}
              deleteNoteHandler={deleteNote}
              deleteTagHandler={removeTag}
              changeNoteHandler={changeNote}
            />
          );
        })}
      </div>
    </div>
  );
};
