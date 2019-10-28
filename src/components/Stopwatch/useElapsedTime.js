import { useRef, useEffect } from 'react';
import useLocalStorage from '../../hooks';

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

function getLapTime(elapsedTime) {
  const e = getElapsedTimeObject(elapsedTime);
  return `${e.minutes} : ${e.seconds} : ${e.milliseconds}`;
}

function getElapsedTimeObject(elapsedTime) {
  const minutes = pad2(Math.floor(elapsedTime / 1000 / 60));
  const seconds = pad2(Math.floor((elapsedTime / 1000) % 60)).slice(0, 2);
  const milliseconds = pad2(elapsedTime % 1000).slice(0, 2);
  return { minutes, seconds, milliseconds };
}

function useElapsedTime(resolution=10) {
  const [status, setStatus] = useLocalStorage('stopwatch:status', STOPWATCH_STATUS.NOT_STARTED);
  // Manually load from localstorage as a date object.
  let startTimeInitialVal;
  try {
    startTimeInitialVal = new Date(JSON.parse(window.localStorage.getItem('stopwatch:startTime')));
  } catch (err) {
    startTimeInitialVal = new Date();
  }
  const [startTime, setStartTime] = useLocalStorage('stopwatch:startTime', startTimeInitialVal, true);
  const [elapsedTime, setElapsedTime] = useLocalStorage('stopwatch:elapsedTime', 0);
  const [offset, setOffset] = useLocalStorage('stopwatch:offset', 0);
  const [lapTimings, setLapTimings] = useLocalStorage('stopwatch:lapTimings', []);

  let timerId = useRef(undefined);

  useEffect(() => {
    if (timerId.current && (status === STOPWATCH_STATUS.NOT_STARTED
        || status === STOPWATCH_STATUS.PAUSED)) {
      clearInterval(timerId.current);
      timerId.current = undefined;
    } else if (status === STOPWATCH_STATUS.RUNNING) {
      timerId.current = setInterval(() => {
        setElapsedTime(elapsedTime => offset + (new Date() - startTime));
      }, resolution);
    }
  }, [status, startTime, offset, resolution]);

  function onControlAction(action) {
    if (action === CONTROL_ACTIONS.START) {
      setStartTime(new Date());
      setStatus(STOPWATCH_STATUS.RUNNING);
    } else if (action === CONTROL_ACTIONS.PAUSE) {
      setOffset(offset => offset + (new Date() - startTime));
      setStatus(STOPWATCH_STATUS.PAUSED);
    } else if (action === CONTROL_ACTIONS.LAP) {
      setLapTimings(lapTimings => (
        [getLapTime(elapsedTime), ...lapTimings]
      ));
    } else if (action === CONTROL_ACTIONS.STOP) {
      setStartTime(undefined);
      setElapsedTime(0);
      setOffset(0);
      setLapTimings([]);
      setStatus(STOPWATCH_STATUS.NOT_STARTED);
    }
  }

  return {
    status,
    elapsedTime,
    lapTimings,
    onControlAction,
  }
}

export { useElapsedTime, STOPWATCH_STATUS, CONTROL_ACTIONS, getElapsedTimeObject };
