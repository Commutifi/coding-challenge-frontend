/* eslint-disable no-mixed-operators */
import { FC, useState } from 'react';
import { unix } from 'dayjs';
import { WeatherIcon } from 'weather-react-icons';

import { useLocation } from '../../providers/LocationProvider';
import { ForecastItem } from '../../components/ForecastItem';

export const WeatherCard: FC = () => {
  const [{ currentWeather, forecasts }] = useLocation();
  const [degreeType, setDegreeType] = useState<'celcius' | 'fahrenheit'>(
    'celcius'
  );

  const toggleDegreeType = () => {
    setDegreeType(degreeType === 'celcius' ? 'fahrenheit' : 'celcius');
  };

  const getBackgroundColorClass = (temp?: number) => {
    if (!temp) {
      return 'bg-gradient-to-b from-[#cbd5e1] to-[#64748b]';
    }
    if (temp > 35) {
      return 'bg-gradient-to-b from-[#fca5a5] to-[#f87171]';
    }

    if (temp > 15) {
      return 'bg-gradient-to-b from-[#fef08a] to-[#a16207]';
    }

    return 'bg-gradient-to-b from-[#297af9] to-[#333fb7]';
  };

  return (
    <div
      className={`sm:w-full lg:w-2/6 xl:max-w-2xl bg-light text-dark border border-dark md:border-none rounded-2xl shadow-lg ${getBackgroundColorClass(
        currentWeather?.temp
      )} px-8 py-3 min-h-[70vh]`}
    >
      {currentWeather && (
        <>
          <h2 className="font-bold text-3xl text-white">
            {currentWeather.name}, {currentWeather.country}
          </h2>
          <p className="text-white text-xl">
            {unix(currentWeather.date)
              .utcOffset(currentWeather.timezone)
              .format('dddd MMM D, YYYY, h:mm A')}
          </p>
          <div className="flex items-center justify-between mt-10 my-3">
            <div className="mt-4">
              <WeatherIcon
                className="text-8xl text-white"
                iconId={currentWeather.icon}
                name="owm"
                night={!currentWeather.isDay}
              />
              <p className="capitalize text-white text-2xl mt-3 text-center">
                {currentWeather.description}
              </p>
            </div>
            <div
              className="text-white text-7xl cursor-pointer"
              onClick={toggleDegreeType}
            >
              {degreeType === 'celcius'
                ? currentWeather.temp
                : (currentWeather.temp * 9) / 5 + 32}
              {degreeType === 'celcius' ? (
                <sup>&#8451;</sup>
              ) : (
                <sup>&#8457;</sup>
              )}
            </div>
            <div className="text-white text-xl">
              <p>Humidity: {currentWeather.humidity}%</p>
              <p>Wind: {currentWeather.wind}kmph</p>
              <p>
                Feels like:{' '}
                {degreeType === 'celcius'
                  ? currentWeather.feels_like
                  : (currentWeather.feels_like * 9) / 5 + 32}
                {degreeType === 'celcius' ? (
                  <sup>&#8451;</sup>
                ) : (
                  <sup>&#8457;</sup>
                )}
              </p>
            </div>
          </div>
        </>
      )}
      {!currentWeather && (
        <div className="text-2xl text-center mt-3">No cities Selected.</div>
      )}
      <div className="flex items-center justify-between mt-16">
        {forecasts.map((item, index) => (
          <ForecastItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};
