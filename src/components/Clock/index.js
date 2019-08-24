import React, { useState, useEffect } from 'react';
import Digit from '../Digit';
import moment from 'moment';
import './Clock.scss';


function getTimeObject() {
  const date = moment(new Date());
  const hours = date.format('HH');
  const minutes = date.format('mm');
  const seconds = date.format('ss');
  const time = { hours, minutes, seconds };
  return time;
}

function TimeUnit(props) {
  return (
    <div className='time-unit'>
      <Digit value={props.value[0]} disabled={props.disabled} />
      <Digit value={props.value[1]} disabled={props.disabled} />
    </div>
  );
}

function Clock(props) {
  const [time, setTime] = useState(getTimeObject());
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(getTimeObject());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className='clock'>
      <TimeUnit disabled={true} value={time.hours} />
      <TimeUnit disabled={true} value={time.minutes} />
      <TimeUnit disabled={true} value={time.seconds} />
    </div>
  );
}

export default Clock;
