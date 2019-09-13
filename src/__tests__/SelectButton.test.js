import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectButton from '../components/SelectButton';


test('renders all choices passed', () => {
  const choicesTexts = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
  const choicesElements = choicesTexts.map(choice => (
    <span value={choice}>{choice}</span>
  ));
  const { getByText } = render(<SelectButton children={choicesElements} onSelect={() => {}} />);
  choicesTexts.forEach(choice => {
    expect(getByText(choice)).toBeInTheDocument();
  });
});

test('adds "selected" class on selected child element', () => {
  const choicesTexts = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
  const choicesElements = choicesTexts.map(choice => (
    <span value={choice}>{choice}</span>
  ));
  const selectedChoiceValue = choicesTexts[
    Math.round(Math.random() * (choicesTexts.length - 1))
  ];
  const { getByText, container } = render(
    <SelectButton
      children={choicesElements}
      onSelect={() => {}}
      selected={selectedChoiceValue} />
  );
  const selectedChoice = container.querySelector('button.selected span');
  const expectedSelectedChoice = getByText(selectedChoiceValue);
  expect(expectedSelectedChoice).toEqual(selectedChoice);
});

test('calls onSelect function with proper choice text on click', () => {
  const choicesTexts = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
  const choicesElements = choicesTexts.map(choice => (
    <span value={choice}>{choice}</span>
  ));
  choicesTexts.forEach(choice => {
    const onSelect = jest.fn();
    const container = document.createElement('div');
    const { getByText } = render(
      <SelectButton
        children={choicesElements}
        onSelect={onSelect} />,
      {
        container: document.body.appendChild(container),
      }
    );
    fireEvent.click(getByText(choice).parentElement);
    expect(onSelect).toBeCalledWith(choice);
  });
});
