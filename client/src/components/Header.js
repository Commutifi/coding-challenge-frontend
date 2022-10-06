import React from 'react';
import { UseAppContext } from '../context/appContext';
import '../styles/Header.scss';

function Header() {
    const { weatherData, currentLocation } = UseAppContext()

    function renderLocation() {
        if (currentLocation) {
            return Object.keys(currentLocation).map((key, index) => {
                if (currentLocation[key]) {
                    return (
                        <div key={index}>{currentLocation[key]}</div>
                    )
                } else {
                    return null
                }
            })
        }

        return <></>
    }

    return (
        <div className='header'>
            {currentLocation ? <div>{weatherData.length} DAY FORCAST</div> : <></>}
            {renderLocation()}
        </div>
    )
}

export default Header;