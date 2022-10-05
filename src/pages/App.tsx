import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import LocationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";

// Components
import Search from "../components/search";

function App() {
  const [isLocal, setIsLocal] = useState(true);
  const locationContext = useContext(LocationContext);
  const location = useLocation(locationContext && locationContext.location);
  const weather = useWeather(locationContext && locationContext.location);

  useEffect(() => {
    if (isLocal) {
      window.navigator.geolocation.getCurrentPosition((loc) => {
        if (locationContext) {
          locationContext.setLocation({
            lon: loc.coords.longitude,
            lat: loc.coords.latitude,
          });
        }
      });
    }
  }, [isLocal]);

  useEffect(() => {
    if (location.data) {
      console.log(location.data["results"][0]["formatted"]);
    }
    // if (weather.data) {
    //   console.log(weather.data["weather"]);
    // }
  });

  return (
    <div className="App">
      <Search setIsLocal={setIsLocal} />
      <h1>Location</h1>

      <h2>
        {location.data &&
          `
          ${location.data["results"][0]["components"]["city"]},
          ${location.data["results"][0]["components"]["country"]}
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
    </div>
  );
}

export default App;
