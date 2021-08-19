import React from 'react';
import classes from './Tag.module.scss';

import ClearIcon from '@material-ui/icons/Clear';

interface ITagProps {
  tag: string;
  noteId: string;
  deleteTagHandler: (noteId: string, tag: string) => void;
}

export const Tag: React.FC<ITagProps> = (props) => {
  return (
    <span className={classes.tag}>
      <div className={classes.tag_text}>{props.tag}</div>
      <div className={classes.icon}>
        <ClearIcon
          onClick={() => {
            props.deleteTagHandler(props.noteId, props.tag);
          }}
        />
      </div>
    </span>
  );
};
