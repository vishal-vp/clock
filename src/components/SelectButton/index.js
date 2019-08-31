import React from 'react';
import './SelectButton.scss';


function SelectButton(props) {
  const buttons = props.children.map(choice => (
    <button
      key={choice.props.value}
      className={choice.props.value === props.selected ? 'selected': ''}
      onClick={() => props.onSelect(choice.props.value)}>{choice}</button>
  ));
  return <div className='select-button'>{buttons}</div>;
}

export default SelectButton;
