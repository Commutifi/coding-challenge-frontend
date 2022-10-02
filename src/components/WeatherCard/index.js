/*
 * @Author: Leo
 * @Date: 2022-09-29 16:25:10
 * @LastEditors: Leo
 * @LastEditTime: 2022-10-02 18:03:45
 * @FilePath: \coding-challenge-frontend\src\components\WeatherCard\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import WeatherService from '../../Apis/WeatherService';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import './index.scss';

const WeatherCard = ({ index, info, unit, handleSwitchUnit }) => {

    const isLocal = useSelector(state => state.location.isLocal);

    const matches = useMediaQuery('(max-width: 900px)');

    const getDayDisplay = () => {
        switch(index) {
            case 0: return 'Today';
            case 1: return 'Tomorrow';
            case 2: return 'After Tomorrow';
            default: return 'unknown';
        }
    }

    const getTextColor = (num) => {
        if (isLocal) return '#757575';

        if(num < 15) return '#0d47a1';
        else if (num > 35) return '#b71c1c';
        else return '#f57f17';
    }

    return (
        <Box className='weather-card-main'>
            <Box
                className='weather-card-color-block'
                sx={{
                    backgroundImage: `linear-gradient(${getTextColor(info.weather.temp.day)}40, rgba(0, 0, 0, 0))`
                }}
            ></Box>
            <Box className='weather-card-container'>
                <Chip label={getDayDisplay()} size='small' color="primary" />
                <Box className='weather-card-date'>
                    <Typography sx={{fontFamily: "'Montserrat', sans-serif", fontSize: 18}}>
                        {moment(info.timeStamp * 1000).format('MMMM Do, dddd')}
                    </Typography>
                </Box>

                <Box className='weather-card-responsive-container'>
                    <Box className='weather-card-temp-icon'>
                        <img
                            alt={info.weather.description}
                            src={WeatherService.getWeatherIconUrl(info.weather.icon, '2x')}
                        />
                    </Box>

                    <Box>
                        <Box className='weather-card-temp-num' onClick={handleSwitchUnit}>
                            <Typography
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: matches ? 24 : 40,
                                    fontWeight: 600,
                                    color: getTextColor(Math.round(info.weather.temp.day))
                                }}
                            >
                                {
                                    unit ?
                                    <span>{`${Math.round(info.weather.temp.day)} `}&#8451;</span> :
                                    <span>{`${Math.round(info.weather.temp.day * 1.8 + 32)} `}&#8457;</span>
                                }
                            </Typography>
                        </Box>
                        <Box className='weather-card-temp-num' onClick={handleSwitchUnit}>
                            <Typography
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: matches ? 12 : 18
                                }}>
                                {
                                    unit ?
                                    <>
                                        <span
                                            style={{
                                                color: getTextColor(Math.round(info.weather.temp.min))
                                            }}
                                        >
                                            {Math.round(info.weather.temp.min)}&#8451;
                                        </span>
                                        &nbsp;~&nbsp;
                                        <span
                                            style={{
                                                color: getTextColor(Math.round(info.weather.temp.max))
                                            }}
                                        >
                                            {Math.round(info.weather.temp.max)}&#8451;
                                        </span>
                                    </> :
                                    <>
                                        <span
                                            style={{
                                                color: getTextColor(Math.round(info.weather.temp.min))
                                            }}
                                        >
                                            {Math.round(info.weather.temp.min * 1.8 + 32)}&#8451;
                                        </span>
                                        &nbsp;~&nbsp;
                                        <span
                                            style={{
                                                color: getTextColor(Math.round(info.weather.temp.max))
                                            }}
                                        >
                                            {Math.round(info.weather.temp.max * 1.8 + 32)}&#8451;
                                        </span>
                                    </>
                                }
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Box className='weather-card-temp-main'>
                            <Typography
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: matches ? 20: 32,
                                    fontWeight: 600
                                }}
                            >
                                {info.weather.main}
                            </Typography>
                        </Box>
                        <Box className='weather-card-temp-main'>
                            <Typography
                                sx={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: matches ? 14 : 18
                                }}
                            >
                                {info.weather.description}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default WeatherCard;