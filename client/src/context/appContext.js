import React, { useEffect, createContext, useContext, useState } from 'react';
import { openWeatherAPI } from '../services/openWeatherAPI';
import { openCageAPI } from '../services/openCageAPI'

const AppContext = createContext(undefined);

export const UseAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {
    const [weatherData, setWeatherData] = useState([]);
    const [locationOptions, setLocationOptions] = useState([])
    const globalValue = "Global Value"

    useEffect(() => {
        openWeatherAPI.initialize().then((data) => {
            console.log('DATA FROM APPCONTEXT', data)
            setWeatherData(data)
        })

    }, [])
    // console.log('locationOptions', locationOptions)
    console.log('weatherData', weatherData)

    const contextData = {
        weatherData,
        setWeatherData,
        setLocationOptions,
        locationOptions,
        global: {
            globalValue
        }
    };

    return (
        <AppContext.Provider value={contextData}>
            {props.children}
        </AppContext.Provider>
    );
};