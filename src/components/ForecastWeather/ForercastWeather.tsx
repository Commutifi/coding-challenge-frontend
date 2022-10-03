import React from 'react';
import './ForecastWeather.scss';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface Props {
	list: Array<any>;
}

const ForercastWeather = ({ list }: Props) => {
	const weekday = new Date().getDay();
	return (
		<div className='forecast-weather'>
			{list.map((weather, index: number) => (
				<div className='day' key={index}>
					<span className='date'>{weekdays[(weekday + index) % 7]}</span>
					<img src={`https://openweathermap.org/img/w/${weather?.weather?.[0].icon}.png`} alt='' />
					<span className='temp-from-to'>
						<span>{weather?.temp?.min}°F</span> - <span>{weather?.temp?.max}°F</span>
					</span>
					<span className='status'>{weather?.weather?.[0].main}</span>
					<span className='description'>{weather?.weather?.[0].description}</span>
				</div>
			))}
		</div>
	);
};

export default ForercastWeather;
