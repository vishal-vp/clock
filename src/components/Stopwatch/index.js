import React from 'react';
import Digit from '../Digit';
import startIcon from '../../assets/start.svg';
import lapIcon from '../../assets/lap.svg';
import pauseIcon from '../../assets/pause.svg';
import stopIcon from '../../assets/stop.svg';
import {
  useElapsedTime, STOPWATCH_STATUS, CONTROL_ACTIONS, getElapsedTimeObject,
} from './useElapsedTime';
import './Stopwatch.scss';


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
  return (
    <div className='lap-timings'>
      <table><tbody>
        {timingElements}
      </tbody></table>
    </div>
  );
}

function Stopwatch(props) {
  const {status, elapsedTime, lapTimings, onControlAction} = useElapsedTime();
  const {minutes, seconds, milliseconds} = getElapsedTimeObject(elapsedTime);

  return (
    <div className={`stopwatch ${props.isHidden ? 'hidden': ''}`}>
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
