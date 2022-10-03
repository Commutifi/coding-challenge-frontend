import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import MainLayout from 'components/Layout/MainLayout';
import TodayWeather from 'components/TodayWeather';
import { ReactComponent as SearchIcon } from 'icons/search-icon.svg';
import styles from './Main.module.scss';
import { getLocationFromGeocode } from 'utils';
import ForecastWeather from 'components/ForecastWeather';

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily';

const Main = () => {
	const [keyword, setKeyword] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [weatherForecast, setWeatherForecast] = useState<Array<Record<any, any>>>([]);
	const [status, setStatus] = useState<number>(1);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async function (position) {
				setKeyword(await getLocationFromGeocode(position.coords.latitude, position.coords.longitude));
			});
		}
	}, []);

	useEffect(() => {
		if (keyword === '') return;
		getWeatherInfo(keyword);
	}, [keyword]);

	const handleInput = useMemo(
		() => debounce((e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value), 500),
		[]
	);

	const getWeatherInfo = async (location: string) => {
		setStatus(1);
		let result;
		try {
			result = await axios.get(
				`${OPEN_WEATHER_API_URL}?q=${location}&cnt=3&units=imperial&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
			);
		} catch (err) {
			setStatus(2);
			return;
		}
		const { city, list } = result.data;
		setStatus(0);
		console.log(list);
		setLocation(`${city.name}, ${city.country}`);
		setWeatherForecast(list);
	};

	return (
		<MainLayout className={styles.main} title='Weather'>
			<div className='container'>
				<div className='search-box'>
					<input type='text' className='search-input' onChange={handleInput} placeholder='e.g. Toronto, Canada' />
					<SearchIcon />
				</div>
				{status === 0 ? (
					<>
						<div className='result-box'>
							<TodayWeather location={location} weather={weatherForecast?.[0]} />
						</div>
						<div className='forecast'>
							<ForecastWeather list={weatherForecast} />
						</div>
					</>
				) : status === 1 ? (
					<div className='loader'>
						<PulseLoader />
					</div>
				) : (
					<span className='not-found'>Sorry but we couldn't find result, please check again</span>
				)}
			</div>
		</MainLayout>
	);
};

export default Main;
