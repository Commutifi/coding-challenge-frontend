import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import MainLayout from 'components/Layout/MainLayout';
import { ReactComponent as SearchIcon } from 'icons/search-icon.svg';
import styles from './Main.module.scss';
import { getLocationFromGeocode } from 'utils';

const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily';

const Main = () => {
	const [keyword, setKeyword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

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

	const handleInput = useCallback(
		debounce((e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value), 300),
		[]
	);

	const getWeatherInfo = async (location: string) => {
		const result = await axios.get(
			`${OPEN_WEATHER_API_URL}?q=${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
		);
		console.log(result);
	};

	return (
		<MainLayout className={styles.main} title='Weather'>
			<div className='container'>
				<div className='search-box'>
					<input type='text' className='search-input' onChange={handleInput} />
					<SearchIcon />
				</div>
			</div>
		</MainLayout>
	);
};

export default Main;
