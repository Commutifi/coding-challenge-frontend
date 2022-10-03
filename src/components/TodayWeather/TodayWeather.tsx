import React, { useEffect, useState } from 'react';
import { getColorFromTemperature } from 'utils';
import { ReactComponent as SunRiseIcon } from 'icons/sun-rise.svg';
import { ReactComponent as SunSetIcon } from 'icons/sun-set.svg';
import './TodayWeather.scss';

interface Props {
	location?: string;
	population?: number;
	weather?: Record<any, any>;
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TodayWeather = ({ location, weather }: Props) => {
	const [currentTemp, setCurrentTemp] = useState<Record<any, any>>({ temp: 0, unit: '°F' });
	const today = new Date();
	const month = today.getMonth();
	const day = today.getDay();
	const date = today.getDate();
	const sunset = new Date(weather?.sunset * 1000).toLocaleTimeString().slice(0, 4);
	const sunrise = new Date(weather?.sunrise * 1000).toLocaleTimeString().slice(0, 4);
	useEffect(() => {
		setCurrentTemp({ temp: weather?.temp.day, unit: '°F' });
	}, [weather]);
	const handleTempClick = () => {
		if (currentTemp.unit === '°F') {
			setCurrentTemp({ temp: ((currentTemp.temp - 32) * 5) / 9, unit: '°C' });
		} else {
			setCurrentTemp({ temp: (currentTemp.temp * 9) / 5 + 32, unit: '°F' });
		}
	};

	return (
		<div className='today-weather'>
			<div className='day-info'>
				<h1 className='location'>{location}</h1>
				<h3 className='date'>{weekdays[day] + ' ' + date + ' ' + months[month]}</h3>
			</div>
			<div className='weather-info'>
				<div className='status-bar'>
					<img
						src={`https://openweathermap.org/img/w/${weather?.weather?.[0].icon}.png`}
						alt=''
						className='status-img'
					/>
					<div className='sun-rise-set'>
						<span className='sun-rise'>
							<SunRiseIcon />
							{sunrise} A.M.
						</span>
						<span className='sun-set'>
							<SunSetIcon />
							{sunset} P.M.
						</span>
					</div>
				</div>
				<div className='detail'>
					<div className='left-panel'>
						<span
							className='temperature'
							style={{ color: `${getColorFromTemperature(weather?.temp.day)}` }}
							onClick={handleTempClick}
						>
							{currentTemp.temp.toFixed(2) + currentTemp.unit}
						</span>
						<span className='description'>{weather?.weather?.[0].main + ', ' + weather?.weather?.[0].description}</span>
					</div>
					<div className='right-panel'>
						<span className='pressure'>Pressure: {weather?.pressure}hPa</span>
						<span className='humidity'>Humidity: {weather?.humidity}%</span>
						<span className='wind'>Wind: {weather?.speed}m/s</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodayWeather;
