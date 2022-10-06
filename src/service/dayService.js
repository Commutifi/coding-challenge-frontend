export const setColorClass = (temp) => {
  if (temp <= 15) return 'blue';
  if (temp >= 35) return 'red';
  return 'yellow';
};

export const setFahrenheit = (temp) => `${Math.round((temp * 9 / 5) + 32)} ℉`;

export const setCelsius = (temp) => `${Math.round(temp)} ℃`;