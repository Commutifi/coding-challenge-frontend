import React, { useContext, useEffect } from "react";
import "./App.scss";
import LocationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";

// Components
import Input from "../components/input";

function App() {
  const locationContext = useContext(LocationContext);
  const location = useLocation(locationContext?.location);
  const weather = useWeather(locationContext?.location);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((loc) => {
      if (locationContext) {
        locationContext.setLocation({
          lon: loc.coords.longitude,
          lat: loc.coords.latitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    // if (location.data) {
    //   console.log(location.data["results"][0]["components"]);
    // }
    // if (weather.data) {
    //   console.log(weather.data["weather"]);
    // }
  });

  return (
    <div className="App">
      <h1>Location</h1>
      <h2>
        {location.data &&
          `
          ${location.data["results"][0]["components"]["country"]}
          ${location.data["results"][0]["components"]["state"]}
          ${location.data["results"][0]["components"]["county"]} 
          `}
      </h2>
      <h3>
        {weather.data &&
          `
          ${weather.data["weather"][0]["main"]}
          ${weather.data["weather"][0]["description"]}
        `}
      </h3>
      <hr />
      <Input />
    </div>
  );
}

export default App;
