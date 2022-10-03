import React, { useEffect, useState } from 'react';
import { getColorFromTemperature } from 'utils';
import './ForecastWeather.scss';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
	list: Array<any>;
}

const ForercastWeather = ({ list }: Props) => {
	const [temperatures, setTemperatures] = useState<Array<Record<any, any>>>([]);
	useEffect(() => {
		let temp = new Array<Record<any, any>>();
		for (let item of list) {
			temp.push({ temp: item.temp.min, unit: '°F' });
			temp.push({ temp: item.temp.max, unit: '°F' });
		}
		setTemperatures(temp);
	}, [list]);
	const weekday = new Date().getDay();

	const handleClick = (index: number) => {
		let temp = temperatures;
		if (temperatures[index].unit === '°F') {
			temp[index] = { temp: ((temperatures[index].temp - 32) * 5) / 9, unit: '°C' };
		} else {
			temp[index] = { temp: (temperatures[index].temp * 9) / 5 + 32, unit: '°F' };
		}
		setTemperatures([...temp]);
	};
	return (
		<div className='forecast-weather'>
			{list.map((weather, index: number) => (
				<div className='day' key={index}>
					<span className='date'>{weekdays[(weekday + index) % 7]}</span>
					<img src={`https://openweathermap.org/img/w/${weather?.weather?.[0].icon}.png`} alt='' />
					<span className='temp-from-to'>
						<span
							onClick={() => handleClick(index * 2)}
							style={{ color: `${getColorFromTemperature(weather?.temp?.min)}` }}
						>
							{temperatures?.[index * 2]?.temp.toFixed(2) + temperatures?.[index * 2]?.unit}
						</span>{' '}
						-{' '}
						<span
							onClick={() => handleClick(index * 2 + 1)}
							style={{ color: `${getColorFromTemperature(weather?.temp?.max)}` }}
						>
							{temperatures?.[index * 2 + 1]?.temp.toFixed(2) + temperatures?.[index * 2 + 1]?.unit}
						</span>
					</span>
					<span className='status'>{weather?.weather?.[0].main}</span>
					<span className='description'>{weather?.weather?.[0].description}</span>
				</div>
			))}
		</div>
	);
};

export default ForercastWeather;
