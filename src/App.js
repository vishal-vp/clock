import React, { useState } from 'react';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import SelectButton from './components/SelectButton';
import clockIcon from './assets/clock.svg';
import stopwatchIcon from './assets/stopwatch.svg';
import './App.scss';

const MODES = Object.freeze({
  CLOCK: { value: 'clock', icon: clockIcon },
  STOPWATCH: { value: 'stopwatch', icon: stopwatchIcon },
});

function ToolSelection(props) {
  const choices = Object.values(MODES).map(choice => (
    <img
      src={choice.icon}
      key={choice.value}
      value={choice.value}
      alt={`select ${choice.value}`} />
  ))

  return (
    <SelectButton
      selected={props.selectedTool}
      onSelect={props.onToolSelect} >{choices}</SelectButton>
  )
}

function App() {
  const [mode, setMode] = useState(MODES.CLOCK.value);

  return (
    <div className='App'>
      <div className='tool'>
        <Clock isHidden={mode !== MODES.CLOCK.value} />
        <Stopwatch isHidden={mode !== MODES.STOPWATCH.value} />
      </div>
      <div className='tool-selection'>
        <ToolSelection onToolSelect={setMode} selectedTool={mode} />
      </div>
    </div>
  );
}

export default App;
