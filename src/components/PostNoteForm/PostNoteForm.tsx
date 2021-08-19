import React from 'react';

import Button from '../UI/button';
import Input from '../UI/input';

import classes from './PostNoteForm.module.scss';
import AddIcon from '@material-ui/icons/Add';

interface IPostNoteFormProps {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

export const PostNoteForm: React.FC<IPostNoteFormProps> = (props) => {
  return (
    <form className={classes.form}>
      <Input
        type="text"
        placeholder="Add new note..."
        onChange={props.changeHandler}
      />
      <Button onClick={props.addHandler}>
        Add <AddIcon />
      </Button>
    </form>
  );
};
