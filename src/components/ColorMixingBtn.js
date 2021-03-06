import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  mixingBtn: {
    border: [
      ['thin', 'solid', '#ddd']
    ],
    width: 45,
    height: 45,
    margin: 10,
    'font-size': '25px',
    transform: 'scale(1)',
    backgroundColor: props => props.colorMixing,
    outline: props => props.outline,
  }
});

const ColorMixingBtn = props => {
  const classes = useStyles(props);
  return(
    <button
      className= {classes.mixingBtn}
      onClick={() => props.onClick(props.colorMixing)}
    ></button>
  )
};

export default ColorMixingBtn;