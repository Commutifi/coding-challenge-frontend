/*
 * @Author: Leo
 * @Date: 2022-09-29 16:10:23
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 16:26:22
 * @FilePath: \coding-challenge-frontend\src\views\Home\index.js
 * @Description:
 */
import React from 'react';
import Box from '@mui/material/Box';
import LocationInput from '../../components/LocationInput';
import WeatherDisplay from '../../components/WeatherDisplay';
import './index.scss';

const Home = () => {
    return (
        <Box className='main'>
            <LocationInput />
            <WeatherDisplay />
        </Box>
    );
};

export default Home;