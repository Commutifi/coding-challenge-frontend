import React from "react";
import "./weatherCard.scss";

type PropsType = {
  pressure?: number;
  humidity?: number;
  temperature: string;
};

const basicCard = ({ pressure, humidity, temperature }: PropsType) => {
  const getTemp = (temp: string) => {
    const t = parseInt(temp);
    if (t <= 15) {
      return "coldTemp50";
    } else if (t < 35) {
      return "medTemp50";
    } else if (t >= 35) {
      return "hotTemp50";
    } else {
      return "";
    }
  };

  return (
    <div className={`basicCard ${getTemp(temperature)}`}>
      {pressure ? (
        <div className="info">
          <span className="highlight">{pressure}</span>
          <span>hPA</span>
        </div>
      ) : (
        <div className="info">
          <span className="highlight">{humidity}</span>
          <span>% Humidity</span>
        </div>
      )}
    </div>
  );
};

export default basicCard;
