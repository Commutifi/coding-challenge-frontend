import { render } from '@testing-library/react';
import { AppContextProvider } from './context/appContext';
import App from './components/App';

test('App', () => {

  const mock = {
    weatherData: [],
    setWeatherData: jest.fn(),
    locationOptions: [],
    setLocationOptions: jest.fn(),
    currentLocation: null,
    setCurrentLocation: jest.fn(),
    helperFunctions: {
      cToF: jest.fn(),
      fToC: jest.fn(),
      toggleTemperatureColor: jest.fn(),
    },
    api: {
      openCageAPI: jest.fn(),
      openWeatherAPI: jest.fn()
    }
  };

  render(
    <AppContextProvider value={mock}>
      <App />
    </AppContextProvider>
  );
});
