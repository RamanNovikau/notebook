import React from 'react';
import classes from './Input.module.scss';

export const Input = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) => {
  return <input className={classes.input} {...props} />;
};
