import React, { useEffect, useRef, useState } from 'react';
import { INote } from '../../types/note-types';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Tag from '../Tag';
import Button from '../UI/button';

import classes from './Note.module.scss';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { nanoid } from 'nanoid';

interface INoteProps {
  note: INote;
  deleteNoteHandler: (note: INote) => void;
  deleteTagHandler: (noteId: string, tag: string) => void;
  changeNoteHandler: (note: INote, text: string) => void;
}

export const Note: React.FC<INoteProps> = (props) => {
  const [isDisabledEdit, setIsDisabledEdit] = useState(true);
  const contentEditable = useRef<HTMLElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    props.changeNoteHandler(props.note, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setIsDisabledEdit(true);
    }
  };

  const handleBlur = () => {
    setIsDisabledEdit(true);
  };

  useEffect(() => {
    contentEditable.current?.focus();
  }, [isDisabledEdit]);

  return (
    <div className={classes.note}>
      <ContentEditable
        innerRef={contentEditable}
        className={classes.text}
        html={props.note.text}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isDisabledEdit}
      />
      <div className={classes.tags}>
        {props.note.tags.map((tag) => {
          return (
            <Tag
              tag={tag}
              key={nanoid()}
              noteId={props.note.id}
              deleteTagHandler={props.deleteTagHandler}
            />
          );
        })}
      </div>
      <div className={classes.contols}>
        <Button
          onClick={() => {
            props.deleteNoteHandler(props.note);
          }}
        >
          Delete
          <DeleteForeverIcon />
        </Button>
        <Button
          onClick={() => {
            setIsDisabledEdit(false);
          }}
        >
          Edit
          <EditIcon />
        </Button>
      </div>
    </div>
  );
};
