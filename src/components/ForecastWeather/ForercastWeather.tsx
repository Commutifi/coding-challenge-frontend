import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/store';
import { setTemperatureType } from 'redux/slices/temperatureType';
import { convertTemperature } from 'utils';
import { getColorFromTemperature } from 'utils';
import './ForecastWeather.scss';

const days = ['Today', 'Tomorrow', 'Day after tomorrow'];

interface Props {
	list?: Array<any>;
	color?: string;
}

const ForercastWeather = ({ list, color }: Props) => {
	const dispatch = useDispatch();
	const type = useSelector((state: RootState) => state.temperatureType.type);
	return (
		<div className='forecast-weather'>
			{list?.map((weather, index: number) => (
				<div className='day' key={index}>
					<span className='date'>{days[index]}</span>
					<img src={`https://openweathermap.org/img/w/${weather?.weather?.[0].icon}.png`} alt='' />
					<span className='temp-from-to'>
						<span
							onClick={() => dispatch(setTemperatureType(type === 'F' ? 'C' : 'F'))}
							style={{ color: `${color === '' ? getColorFromTemperature(weather?.temp?.min) : '#5C5C5C'}` }}
						>
							{convertTemperature(weather.temp.min, type)}
						</span>{' '}
						-{' '}
						<span
							onClick={() => dispatch(setTemperatureType(type === 'F' ? 'C' : 'F'))}
							style={{ color: `${color === '' ? getColorFromTemperature(weather?.temp?.max) : '#5C5C5C'}` }}
						>
							{convertTemperature(weather.temp.max, type)}
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
