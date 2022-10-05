import React, { useContext, useEffect } from "react";
import "./App.scss";
import LocationContext from "../context/LocationContext";

function App() {
  const locationContext = useContext(LocationContext);

  useEffect(() => {
    const grabLocalLocation = (loc: {
      coords: { longitude: number; latitude: number };
    }) => {
      if (locationContext) {
        locationContext.setLocation({
          lon: loc.coords.longitude,
          lat: loc.coords.latitude,
        });
      }
    };

    window.navigator.geolocation.getCurrentPosition(grabLocalLocation);
  }, []);

  return (
    <div className="App">
      <h1>Location</h1>
      <h2>
        {locationContext &&
          `${locationContext.location?.lat.toFixed(6)} 
          ${locationContext.location?.lon.toFixed(6)}`}
      </h2>
    </div>
  );
}

export default App;
