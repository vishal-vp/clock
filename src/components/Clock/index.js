import React from 'react';
import Digit from '../Digit';
import './Clock.scss';


function Clock(props) {
  return (
    <div className='clock'>
      <div className='time-unit'>
        <Digit value={0} disabled={true} />
        <Digit value={1} disabled={true} />
      </div>
      <div className='time-unit'>
        <Digit value={2} disabled={true} />
        <Digit value={4} disabled={true} />
      </div>
      <div className='time-unit'>
        <Digit value={3} disabled={true} />
        <Digit value={9} disabled={true} />
      </div>
    </div>
  );
}

export default Clock;
