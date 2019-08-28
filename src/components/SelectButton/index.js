import React from 'react';
import './SelectButton.scss';


function SelectButton(props) {
  const buttons = props.choices.map(choice => (
    <button
      key={choice}
      className={`${choice === props.selected ? 'selected': ''}`}
      onClick={() => props.onSelect(choice)}>{choice}</button>
  ));
  return <div className='select-button'>{buttons}</div>;
}

export default SelectButton;
