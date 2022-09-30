/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 20:13:14
 * @FilePath: \coding-challenge-frontend\src\components\WeatherDisplay\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import WeatherCard from '../WeatherCard';
import Typography from '@mui/material/Typography';
import WeatherService from '../../Apis/WeatherService';
import LocationService from '../../Apis/LocationService';
import './index.scss';

const WeatherDisplay = () => {

    const [weatherInfo, setWeatherInfo] = React.useState([]);
    const [location, setLocation] = React.useState('unknown');
    const [unit, setUnit] = React.useState(true);

    const getRemoteData = async () => {
        const res = await WeatherService.getWeatherByLocation(43.6, -79.3);
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
        const locationRes = await LocationService.getPlaceByLocation(43.6, -79.3);
        if (locationRes.status === 200) {
            const location = locationRes.data;
            setLocation(location.results[0].formatted);
        }
    };

    const handleSwitchUnit = () => {
        setUnit((prev) => !prev);
    };

    React.useEffect(() => {
        getRemoteData();
    }, []);

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