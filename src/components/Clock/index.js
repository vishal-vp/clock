import React, { useState, useEffect } from 'react';
import Digit from '../Digit';
import SelectButton from '../SelectButton';
import moment from 'moment';
import useClockSettings from './useClockSettings';
import './Clock.scss';


const TIME_FORMATS = Object.freeze({
  TWELVE: 12,
  TWENTY_FOUR: 24,
});

function getTimeObject(format) {
  const hourFormat = format === TIME_FORMATS.TWELVE ? 'hh' : 'HH';
  const date = moment(new Date());
  const hours = date.format(hourFormat);
  const minutes = date.format('mm');
  const seconds = date.format('ss');
  const meridiem = date.format('A');
  const time = { hours, minutes, seconds, meridiem };
  return time;
}

function ClockSettings(props) {
  return (
    <div className='clock-settings'>
      <SelectButton
        onSelect={props.handleTimeFormatChange}
        selected={props.settings.format}>
        {Object.values(TIME_FORMATS).map(choice => (
          <span key={choice} value={choice}>{choice}</span>
        ))}
      </SelectButton>
    </div>
  );
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
  const clockSettings = useClockSettings({ format: TIME_FORMATS.TWELVE });
  const [time, setTime] = useState(getTimeObject(clockSettings.settings.format));
  useEffect(() => {
    setTime(getTimeObject(clockSettings.settings.format));
    const timerId = setInterval(() => {
      setTime(getTimeObject(clockSettings.settings.format));
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [clockSettings.settings.format]);

  return (
    <div className={`clock ${props.isHidden ? 'hidden': ''}`}>
      <ClockSettings {...clockSettings} />
      <div className='time'>
        <TimeUnit disabled={true} value={time.hours} />
        <TimeUnit disabled={true} value={time.minutes} />
        <TimeUnit disabled={true} value={time.seconds} />
        {clockSettings.settings.format === TIME_FORMATS.TWELVE &&
          <div className='meridiem'><span>{time.meridiem}</span></div>
        }
      </div>
    </div>
  );
}

export default Clock;
