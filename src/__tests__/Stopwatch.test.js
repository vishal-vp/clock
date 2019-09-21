import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import Stopwatch from '../components/Stopwatch';
import moment from 'moment';
import lolex from 'lolex';


let clock;

beforeEach(() => {
  clock = lolex.install({ now: new Date() });
});

afterEach(() => {
  clock.uninstall();
});

function parseTimeFromTimeUnits(timeUnits) {
  return [...timeUnits].map(timeUnit => {
    const digits = [...timeUnit.querySelectorAll('input.digit')];
    return digits.map(digit => digit.value).join('');
  }).join(':');
}

test('Stopwatch renders without crashing', () => {
  render(<Stopwatch />);
});

/* Stopwatch controls tests */
test('Stopwatch renders with start button', () => {
  const { getByAltText } = render(<Stopwatch />);
  expect(getByAltText('start stopwatch')).toBeInTheDocument();
});

test('Stopwatch renders with only start stopwatch button', () => {
  const { getByAltText, queryByAltText } = render(<Stopwatch />);
  expect(getByAltText('start stopwatch')).toBeInTheDocument();
  expect(queryByAltText('pause stopwatch')).not.toBeInTheDocument();
  expect(queryByAltText('stop stopwatch')).not.toBeInTheDocument();
  expect(queryByAltText('note elapsed time')).not.toBeInTheDocument();
});

test('Stopwatch switches to running controls on click of start button', () => {
  const { getByAltText, queryByAltText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  expect(getByAltText('pause stopwatch')).toBeInTheDocument();
  expect(getByAltText('note elapsed time')).toBeInTheDocument();
  expect(queryByAltText('start stopwatch')).not.toBeInTheDocument();
  expect(queryByAltText('stop stopwatch')).not.toBeInTheDocument();
});

test('Stopwatch switches to paused controls on click of pause button', () => {
  const { getByAltText, queryByAltText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  fireEvent.click(getByAltText('pause stopwatch'));
  expect(getByAltText('start stopwatch')).toBeInTheDocument();
  expect(getByAltText('stop stopwatch')).toBeInTheDocument();
  expect(queryByAltText('note elapsed time')).not.toBeInTheDocument();
  expect(queryByAltText('pause stopwatch')).not.toBeInTheDocument();
});

test('Stopwatch switches not yet started controls on click of stop button', () => {
  const { getByAltText, queryByAltText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  fireEvent.click(getByAltText('pause stopwatch'));
  fireEvent.click(getByAltText('stop stopwatch'));
  expect(getByAltText('start stopwatch')).toBeInTheDocument();
  expect(queryByAltText('stop stopwatch')).not.toBeInTheDocument();
  expect(queryByAltText('pause stopwatch')).not.toBeInTheDocument();
  expect(queryByAltText('note elapsed time')).not.toBeInTheDocument();
});
/* Stopwatch controls tests */

/* Stopwatch functionality tests */
test('Stopwatch correctly displays elapsed time', () => {
  const { container, getByAltText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  let time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  const startTime = moment(new Date());
  expect(time).toEqual('00:00:00');
  act(() => { clock.tick(1000); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:01:00');
  act(() => { clock.tick(1100); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:02:10');
  act(() => { clock.tick(60000); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('01:02:10');
});

test('Clicking on pause button pauses the stopwatch', () => {
  const { container, getByAltText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  let time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  const startTime = moment(new Date());
  act(() => { clock.tick(1000); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:01:00');
  fireEvent.click(getByAltText('pause stopwatch'));
  act(() => { clock.tick(1000); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:01:00');
});

test('Clicking on note elapsed time button adds lap timing', () => {
  const { container, getByAltText, getByText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  let time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  const startTime = moment(new Date());
  fireEvent.click(getByAltText('note elapsed time'));
  expect(getByText(time.replace(/:/g, ' : '))).toBeInTheDocument();
  act(() => { clock.tick(1000); });
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  fireEvent.click(getByAltText('note elapsed time'));
  expect(getByText(time.replace(/:/g, ' : '))).toBeInTheDocument();
});

test('Clicking on stop button resets the clock', () => {
  const { container, getByAltText, getByText } = render(<Stopwatch />);
  fireEvent.click(getByAltText('start stopwatch'));
  const startTime = moment(new Date());
  fireEvent.click(getByAltText('note elapsed time'));
  act(() => { clock.tick(1000); });
  let time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:01:00');
  fireEvent.click(getByAltText('pause stopwatch'));
  fireEvent.click(getByAltText('stop stopwatch'));
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual('00:00:00');
});
/* Stopwatch functionality tests */
