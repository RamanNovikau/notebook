import React, { useEffect, useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import {
  plainHashTags,
  highlightHashTag,
  handleHashTags,
} from '../../utils/hashTags';

import classes from './FilterNoteForm.module.scss';

interface IFilterNoteForm {
  setFilterTags: (value: React.SetStateAction<string[]>) => void;
}
export const FilterNoteForm: React.FC<IFilterNoteForm> = (props) => {
  const [filter, setFilter] = useState('');
  const [isDisabledEdit, setIsDisabledEdit] = useState(true);
  const contentEditable = useRef<HTMLElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    const text = plainHashTags(e.target.value);
    setFilter(highlightHashTag(text));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setIsDisabledEdit(true);
    }
  };

  useEffect(() => {
    props.setFilterTags(handleHashTags(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleBlur = () => {
    setIsDisabledEdit(true);
  };

  useEffect(() => {
    contentEditable.current?.focus();
  }, [isDisabledEdit]);

  return (
    <form className={classes.form}>
      Filter by tags:
      <ContentEditable
        innerRef={contentEditable}
        className={classes.editable}
        html={filter}
        onClick={() => {
          setIsDisabledEdit(false);
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isDisabledEdit}
        placeholder={'filter by tags...'}
      />
    </form>
  );
};
