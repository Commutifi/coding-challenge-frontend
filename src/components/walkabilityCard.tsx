import React, { useState, useEffect } from "react";
import "./weatherCard.scss";

type PropsType = {
  feelsLike: string;
  weather: string;
  humidity: number;
};

const calculateWalkScore = (
  weather: string,
  feelsLike: string,
  humidity: number
) => {
  let baseScore = 100;
  const temp = parseInt(feelsLike);

  if (temp < 0) {
    baseScore -= temp + 18;
  } else if (temp < 18) {
    baseScore -= temp;
  } else if (temp > 18) {
    baseScore -= temp;
  }

  if (weather.includes("rain")) {
    baseScore -= 20;
  }

  if (humidity > 70) {
    baseScore -= humidity * 0.3;
  } else if (humidity < 30) {
    baseScore -= humidity * 0.6;
  }

  return baseScore.toFixed(0);
};

const WalkabilityCard = ({ feelsLike, weather, humidity }: PropsType) => {
  const [score, setScore] = useState(
    calculateWalkScore(weather, feelsLike, humidity)
  );

  useEffect(() => {
    setScore(calculateWalkScore(weather, feelsLike, humidity));
  }, [weather, feelsLike, humidity]);

  return (
    <div
      className={`walkabilityCard ${parseInt(score) > 70 ? "walkable" : ""}`}
    >
      <div className="score">{score}</div>
      <div className="title">Walkability Score</div>
    </div>
  );
};

export default WalkabilityCard;
