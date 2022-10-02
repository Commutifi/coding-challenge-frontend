/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-02 18:13:09
 * @FilePath: \coding-challenge-frontend\src\components\WeatherDisplay\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import WeatherCard from '../WeatherCard';
import Skeleton from '@mui/material/Skeleton';
import WeatherService from '../../Apis/WeatherService';
import LocationService from '../../Apis/LocationService';
import { useSelector } from 'react-redux';
import './index.scss';

const WeatherDisplay = () => {

    const [weatherInfo, setWeatherInfo] = React.useState([]);
    const [location, setLocation] = React.useState('');
    const [unit, setUnit] = React.useState(true);
    const [locationLoading, setLocationLoading] = React.useState(false);
    const [cardLoading, setCardLoading] = React.useState(false);
    const locationInfo = useSelector(state => state.location);

    const getRemoteData = async () => {
        if (locationInfo.lat && locationInfo.lon) {
            setCardLoading(true);
            setLocationLoading(true);
            const res = await WeatherService.getWeatherByLocation(locationInfo.lat, locationInfo.lon);
            if (res.status === 200) {
                const weather = res.data;
                setWeatherInfo(() => {
                    const temp = weather.daily.slice(0, 3).map((item, index) => ({
                        timeStamp: item.dt,
                        weather: {
                            ...item.weather[0],
                            temp: item.temp
                        }
                    }));
                    return temp;
                });
            } else {
                alert('request failed');
            }
            setCardLoading(false);
            const locationRes = await LocationService.getPlaceByLocation(locationInfo.lat, locationInfo.lon);
            if (locationRes.status === 200) {
                const location = locationRes.data;
                setLocation(location.results[0].formatted);
            } else {
                alert('request failed');
            }
            setLocationLoading(false);
        }
    };

    const handleSwitchUnit = () => {
        setUnit((prev) => !prev);
    };

    React.useEffect(() => {
        getRemoteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationInfo]);

    return (
        <Box className='weather-display-main animate__animated animate__fadeInUp'>
            <Box
                className={`weather-display-local-mark animate__animated ${locationInfo.isLocal ? 'animate__zoomIn' : 'animate__zoomOut'}`}
            >
                <Chip label='Current Location' variant="outlined" color="primary" size='small' />
            </Box>
            <Box className='weather-display-city-name'>
                {
                    locationLoading ?
                    <Box p='0 10%'>
                        <Skeleton variant="rectangular" width='100%' height={60} sx={{borderRadius: 30}} />
                    </Box> :
                    <Box>
                        {location}
                    </Box>
                }
            </Box>
            <Box className='weather-display-container'>
                {
                    cardLoading ?
                    [1, 2, 3].map(() => (
                        <Box className='weather-card-loading-main'>
                            <Skeleton variant="rounded" width={70} height={32} sx={{borderRadius: 16}} />
                            <Skeleton variant="rectangular" width='90%' height={20} sx={{mt: 3, borderRadius: 2}} />
                            <Skeleton variant="rectangular" width='90%' height={150} sx={{mt: 3, borderRadius: 4}} />
                            <Skeleton variant="rectangular" width='50%' height={60} sx={{mt: 3, borderRadius: 30}} />
                            <Skeleton variant="rectangular" width='50%' height={20} sx={{mt: 3, borderRadius: 10}} />
                            <Skeleton variant="rectangular" width='60%' height={40} sx={{mt: 3, borderRadius: 20}} />
                        </Box>
                    )) :
                    weatherInfo.map((item, index) => (
                        <WeatherCard
                            key={item.timeStamp}
                            index={index}
                            info={item}
                            unit={unit}
                            handleSwitchUnit={handleSwitchUnit}
                        />
                    ))
                }
            </Box>
        </Box>
    );
};

export default WeatherDisplay;