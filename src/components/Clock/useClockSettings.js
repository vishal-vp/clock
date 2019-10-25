import useLocalStorage from '../../hooks';

function useClockSettings(initialSettings) {
  const [settings, setSettings] = useLocalStorage('clock:settings', initialSettings);

  function handleTimeFormatChange(format) {
    setSettings({...settings, format});
  }

  return {
    settings,
    handleTimeFormatChange,
  }
}

export default useClockSettings;
