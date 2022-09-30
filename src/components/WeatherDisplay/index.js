/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 21:35:00
 * @FilePath: \coding-challenge-frontend\src\components\WeatherDisplay\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import WeatherCard from '../WeatherCard';
import Typography from '@mui/material/Typography';
import WeatherService from '../../Apis/WeatherService';
import LocationService from '../../Apis/LocationService';
import { useSelector } from 'react-redux';
import './index.scss';

const WeatherDisplay = () => {

    const [weatherInfo, setWeatherInfo] = React.useState([]);
    const [location, setLocation] = React.useState('');
    const [unit, setUnit] = React.useState(true);
    const locationInfo = useSelector(state => state.location);

    const getRemoteData = async () => {
        console.log(locationInfo)
        if (locationInfo.lat && locationInfo.lon) {
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
            const locationRes = await LocationService.getPlaceByLocation(locationInfo.lat, locationInfo.lon);
            if (locationRes.status === 200) {
                const location = locationRes.data;
                setLocation(location.results[0].formatted);
            }
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
        <Box className='weather-display-main'>
            <Box className='weather-display-city-name'>
                <Typography variant="h4" sx={{fontFamily: "'Montserrat', sans-serif"}}>
                    {location}
                </Typography>
            </Box>
            <Box className='weather-display-container'>
                {
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