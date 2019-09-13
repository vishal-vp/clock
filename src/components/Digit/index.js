import React from 'react';
import './Digit.scss';

function Digit(props) {
  const value = isNaN(parseInt(props.value, 10)) ? '0' : props.value;
  return (
    <input className='digit' type='text' value={value} disabled={props.disabled} readOnly={true} />
  );
}

export default Digit;
