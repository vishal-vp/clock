import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Clock from '../components/Clock';
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

test('Clock displays the current time', () => {
  const date = moment(new Date());
  const time = date.format('hhmmss');
  const timeChars = {};
  for (const c of time) {
    timeChars[c] = timeChars[c] ? timeChars[c] + 1 : 1;
  }
  const meridiem = date.format('A');

  const { getByText, getAllByDisplayValue } = render(<Clock />);
  for (const c in timeChars) {
    expect(getAllByDisplayValue(c).length).toEqual(timeChars[c]);
  }
  expect(getByText(meridiem)).toBeInTheDocument();
});

test('Clock displays time in 12 hour format by default', () => {
  clock.uninstall();
  const day = '2019/01/01';
  const expectedTime = '13:00:00';
  const expected12HrTime = '01:00:00';
  clock = lolex.install({ now: new Date(`${day} ${expectedTime}`) });
  const { container } = render(<Clock />);
  const time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual(expected12HrTime);
});

test('Clock changes time to 24 hour format on click of 24 hr format setting', () => {
  clock.uninstall();
  const day = '2019/01/01';
  const expectedTime = '13:00:00';
  const expected12HrTime = '01:00:00';
  const expected24HrTime = expectedTime;
  clock = lolex.install({ now: new Date(`${day} ${expectedTime}`) });
  const { container, getByText } = render(<Clock />);
  let time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual(expected12HrTime);
  fireEvent.click(getByText('24'));
  time = parseTimeFromTimeUnits(container.querySelectorAll('.time-unit'));
  expect(time).toEqual(expected24HrTime);
});

test('Clock hides meridiem on click of 24 hr format setting', () => {
  const meridiem = (new Date()).getHours() < 12 ? 'AM' : 'PM';
  const { queryByText, getByText } = render(<Clock />);
  expect(queryByText(meridiem)).toBeInTheDocument();
  fireEvent.click(queryByText('24'));
  expect(queryByText('AM')).not.toBeInTheDocument();
  expect(queryByText('PM')).not.toBeInTheDocument();
});
