import React from 'react';
import 'weather-react-icons/lib/css/weather-icons.css';

import { LocationContextProvider } from './providers/LocationProvider';
import { LocationInput } from './containers/LocationInput';
import { WeatherCard } from './containers/WeatherCard';

function App() {
  return (
    <LocationContextProvider>
      <div className="flex flex-col items-center mt-20">
        <LocationInput />
        <WeatherCard />
      </div>
    </LocationContextProvider>
  );
}

export default App;
