import { useState } from "react";

function useClockSettings(initialSettings) {
  const [settings, setSettings] = useState(initialSettings);

  function handleTimeFormatChange(format) {
    setSettings({...settings, format});
  }

  return {
    settings,
    handleTimeFormatChange,
  }
}

export default useClockSettings;
