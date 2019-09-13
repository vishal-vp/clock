import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Digit from '../components/Digit';

test('displays passed digit', () => {
  const { getByDisplayValue } = render(<Digit value='1' />);
  expect(getByDisplayValue('1')).toBeInTheDocument();
  expect(getByDisplayValue('1')).toBeEnabled();
});

test('displays 0 if passed value is not Integer', () => {
  const { queryByDisplayValue } = render(<Digit value='x' />);
  expect(queryByDisplayValue('0')).toBeInTheDocument();
  expect(queryByDisplayValue('0')).toBeEnabled();
});

test('should display disabled input if disabled prop is true', () => {
  const { queryByDisplayValue } = render(<Digit value='0' disabled={true} />);
  expect(queryByDisplayValue('0')).toBeDisabled();
});
