import { FC } from 'react';
import { WeatherIcon } from 'weather-react-icons';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
extend(utc);

import { WeatherForecastItem } from '../../types';

interface ForecastItemProps {
  item: WeatherForecastItem;
  dayAfterTemp?: boolean;
}

export const ForecastItem: FC<ForecastItemProps> = ({
  item,
  dayAfterTemp = false,
}: ForecastItemProps) => {
  return (
    <div className="text-white flex flex-col items-center">
      {!dayAfterTemp && (
        <p className="mb-1">{dayjs(item.dt_txt).format('dddd')}</p>
      )}
      {!dayAfterTemp && (
        <p className="mb-3">{dayjs(item.dt_txt).format('MMM D, YYYY')}</p>
      )}
      <WeatherIcon iconId={item.icon} name="owm" className="text-6xl my-2" />
      <div className="capitalize">{item.description}</div>
      <div className="flex items-center justitfy-between py-2">
        <span className="px-2">
          {item.temp_min} <sup>&#8451;</sup>
        </span>
        /
        <span className="px-2">
          {item.temp_max} <sup>&#8451;</sup>
        </span>
      </div>
      <div className="py-0.5">Humidity: {item.humidity}%</div>
      <div className="py-0.5">Wind: {item.wind}kmph</div>
      <div className="py-0.5">
        Feels Like: {item.feels_like}
        <sup>&#8451;</sup>
      </div>
      {dayAfterTemp && (
        <p className="mt-3">{dayjs(item.dt_txt).format('dddd')}</p>
      )}
      {dayAfterTemp && (
        <p className="mt-1">{dayjs(item.dt_txt).format('MMM D, YYYY')}</p>
      )}
    </div>
  );
};
