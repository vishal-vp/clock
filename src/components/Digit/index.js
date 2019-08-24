import React from 'react';
import './Digit.scss';

function Digit(props) {
  return (
    <input className='digit' type='text' value={props.value} disabled={props.disabled} />
  );
}

export default Digit;
