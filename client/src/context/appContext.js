import React, { useEffect, createContext, useContext, useState } from 'react';
import { openWeatherAPI } from '../apiServices/openWeatherAPI';
import { openCageAPI } from '../apiServices/openCageAPI'
import { cToF, fToC } from '../helpers/temperatureConvertion';
import toggleTemperatureColor from '../helpers/temperatureColorToggle'

const AppContext = createContext(undefined);

export const UseAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {
    const [weatherData, setWeatherData] = useState([]);
    const [locationOptions, setLocationOptions] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        openWeatherAPI.initialize()
            .then((data) => {
                setWeatherData(data)
                setCurrentLocation(openWeatherAPI.getCurrentLocation())
            })
            .catch(() => {

            })
    }, [])

    const contextData = {
        weatherData,
        setWeatherData,
        locationOptions,
        setLocationOptions,
        currentLocation,
        setCurrentLocation,
        helperFunctions: {
            cToF,
            fToC,
            toggleTemperatureColor,
        },
        api: {
            openCageAPI,
            openWeatherAPI
        }
    };

    return (
        <AppContext.Provider value={contextData}>
            {props.children}
        </AppContext.Provider>
    );
};