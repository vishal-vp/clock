import React, { useState, useEffect, useRef } from 'react';
import Digit from '../Digit';
import startIcon from '../../assets/start.svg';
import lapIcon from '../../assets/lap.svg';
import pauseIcon from '../../assets/pause.svg';
import stopIcon from '../../assets/stop.svg';
import './Stopwatch.scss';


const RESOLUTION = 10;

const STOPWATCH_STATUS = Object.freeze({
  NOT_STARTED: 'NOT_STARTED',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
});

const CONTROL_ACTIONS = Object.freeze({
  START: 'START',
  LAP: 'LAP',
  PAUSE: 'PAUSE',
  STOP: 'STOP',
});

function pad2(value) {
  return (value < 10 ? '0' : '') + value;
}

function getElapsedTimeObject(elapsedTime) {
  const minutes = pad2(Math.floor(elapsedTime / 1000 / 60));
  const seconds = pad2(Math.floor((elapsedTime / 1000) % 60)).slice(0, 2);
  const milliseconds = pad2(elapsedTime % 1000).slice(0, 2);
  return { minutes, seconds, milliseconds };
}

function getLapTime(elapsedTime) {
  const e = getElapsedTimeObject(elapsedTime);
  return `${e.minutes} : ${e.seconds} : ${e.milliseconds}`;
}

function TimeUnit(props) {
  return (
    <div className='time-unit'>
      {props.value.split('').map((value, index) => (
        <Digit
          key={index}
          value={value}
          disabled={props.disabled} />
      ))}
    </div>
  );
}

function NotYetStartedControls(props) {
  return (
    <div className='stopwatch-controls'>
      <button
        className='stopwatch-control'
        onClick={() => props.onClick(CONTROL_ACTIONS.START)}>
        <img src={startIcon} alt='start stopwatch' />
      </button>
    </div>
  )
}

function RunningControls(props) {
  return (
    <div className='stopwatch-controls'>
      <button
        className='stopwatch-control'
        onClick={() => props.onClick(CONTROL_ACTIONS.PAUSE)}>
        <img src={pauseIcon} alt='pause stopwatch' />
      </button>
      <button
        className='stopwatch-control'
        onClick={() => props.onClick(CONTROL_ACTIONS.LAP)}>
        <img src={lapIcon} alt='note elapsed time' />
      </button>
    </div>
  )
}

function PausedControls(props) {
  return (
    <div className='stopwatch-controls'>
      <button
        className='stopwatch-control'
        onClick={() => props.onClick(CONTROL_ACTIONS.START)}>
        <img src={startIcon} alt='start stopwatch' />
      </button>
      <button
        className='stopwatch-control'
        onClick={() => props.onClick(CONTROL_ACTIONS.STOP)}>
        <img src={stopIcon} alt='stop stopwatch' />
      </button>
    </div>
  )
}

function StopwatchControls(props) {
  return (
    <>
      {props.status === STOPWATCH_STATUS.NOT_STARTED
       && <NotYetStartedControls onClick={props.onControlAction} />}
      {props.status === STOPWATCH_STATUS.RUNNING
       && <RunningControls onClick={props.onControlAction} />}
      {props.status === STOPWATCH_STATUS.PAUSED
       && <PausedControls onClick={props.onControlAction} />}
    </>
  );
}

function LapTimings(props) {
  const timingElements = props.timings.map((timing, index) => (
    <tr key={timing}><td>{index + 1}.</td><td>{timing}</td></tr>
  ));
  return (<div className='lap-timings'><table>{timingElements}</table></div>);
}

function Stopwatch(props) {
  const [status, setStatus] = useState(STOPWATCH_STATUS.NOT_STARTED);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimings, setLapTimings] = useState([]);

  let timerId = useRef(undefined);
  useEffect(() => {
    if (timerId.current && (status === STOPWATCH_STATUS.NOT_STARTED
        || status === STOPWATCH_STATUS.PAUSED)) {
      clearInterval(timerId.current);
      timerId.current = undefined;
    } else if (status === STOPWATCH_STATUS.RUNNING) {
      timerId.current = setInterval(() => {
        setElapsedTime(elapsedTime => elapsedTime + RESOLUTION);
      }, RESOLUTION);
    }
  }, [status]);

  function onControlAction(action) {
    if (action === CONTROL_ACTIONS.START) {
      setStatus(STOPWATCH_STATUS.RUNNING);
    } else if (action === CONTROL_ACTIONS.PAUSE) {
      setStatus(STOPWATCH_STATUS.PAUSED);
    } else if (action === CONTROL_ACTIONS.LAP) {
      setLapTimings(lapTimings => (
        [getLapTime(elapsedTime), ...lapTimings]
      ));
    } else if (action === CONTROL_ACTIONS.STOP) {
      setElapsedTime(0);
      setLapTimings([]);
      setStatus(STOPWATCH_STATUS.NOT_STARTED);
    }
  }

  const {minutes, seconds, milliseconds} = getElapsedTimeObject(elapsedTime);

  return (
    <div className='stopwatch'>
      <div className='time'>
        <TimeUnit disabled={true} value={minutes} />
        <TimeUnit disabled={true} value={seconds} />
        <TimeUnit disabled={true} value={milliseconds} />
      </div>
      <StopwatchControls status={status} onControlAction={onControlAction} />
      <LapTimings timings={lapTimings} />
    </div>
  );
}

export default Stopwatch;
