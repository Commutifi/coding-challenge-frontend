import React from "react";
import TemperatureCard from "./temperatureCard";
import BasicCard from "./basicCard";
import WalkabilityCard from "./walkabilityCard";

type Props = {
  day: {
    temp: {
      day: number;
    };
    feels_like: {
      day: number;
    };
    weather: [
      {
        description: string;
      }
    ];
    pressure: number;
    humidity: number;
  } | null;
  title: string;
  above: boolean;
  units: boolean;
  setUnits: React.Dispatch<React.SetStateAction<boolean>>;
};

const day = ({ day, title, above = true, units, setUnits }: Props) => {
  if (day === null) {
    return (
      <div className="weatherInfo">
        {above && <h3>{title}</h3>}
        <TemperatureCard
          temperature=""
          feelsLike=""
          weather="No Location"
          units={units}
          setUnits={setUnits}
        />
        {!above && <h3>{title}</h3>}
      </div>
    );
  } else {
    return (
      <div className="weatherInfo">
        {above && <h3>{title}</h3>}
        <TemperatureCard
          temperature={day["temp"]["day"].toFixed(0)}
          feelsLike={day["feels_like"]["day"].toFixed(0)}
          weather={day["weather"][0]["description"]}
          units={units}
          setUnits={setUnits}
        />
        <div className="col">
          <BasicCard
            pressure={day["pressure"]}
            temperature={day["temp"]["day"].toFixed(0)}
          />
          <BasicCard
            humidity={day["humidity"]}
            temperature={day["temp"]["day"].toFixed(0)}
          />
        </div>
        <div className="col">
          <WalkabilityCard
            feelsLike={day["temp"]["day"].toFixed(0)}
            weather={day["weather"][0]["description"]}
            humidity={day["humidity"]}
          />
        </div>
        {!above && <h3>{title}</h3>}
      </div>
    );
  }
};

export default day;
