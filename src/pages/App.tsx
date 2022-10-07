import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import LocationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import useWeather from "../hooks/useWeather";

// Components
import Search from "../components/search";
import TemperatureCard from "../components/temperatureCard";
import BasicCard from "../components/basicCard";
import Day from "../components/day";

function App() {
  const [isLocal, setIsLocal] = useState(true);
  const [isCelcius, setIsCelcius] = useState(true);
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

  const renderDays = (arr: any) => {
    const dayOfWeekDigit = new Date().getDay();

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const nextDays = [
      "Today",
      "Tomorrow",
      daysOfWeek[(dayOfWeekDigit + 2) % 7],
    ];
    let days: any = [];

    if (arr === null) {
      for (let i = 0; i < 3; i++) {
        days.push(
          <Day
            key={i}
            day={null}
            title={nextDays[i]}
            above={true}
            units={isCelcius}
            setUnits={setIsCelcius}
          />
        );
      }
      return days;
    }

    if (arr.length) {
      arr.forEach((day: any, indx: number) => {
        days.push(
          <Day
            key={indx}
            day={day}
            title={nextDays[indx]}
            above={true}
            units={isCelcius}
            setUnits={setIsCelcius}
          />
        );
      });
    }

    return days;
  };

  return (
    <div className="App">
      <h1>Commutifi Weather App</h1>

      <Search setIsLocal={setIsLocal} />

      <h2>
        {location.data &&
          `
          ${location.data["results"][0]["components"]["city"]},
          ${location.data["results"][0]["components"]["country"]}
          
          `}
      </h2>

      <div className="days">
        {weather.data
          ? renderDays(weather.data["list"])
          : renderDays(weather.data)}
      </div>
    </div>
  );
}

export default App;
