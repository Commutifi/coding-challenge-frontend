import { useEffect, useState } from 'react'
import { openWeatherAPI } from '../services/openWeatherAPI';
import '../styles/Card.scss'

function Card(props) {
    const BASE_URL = process.env.REACT_APP_OPEN_WEATHER_ICONS
    const { data } = props

    return (
        <div className='card'>
            <h6 className='card__date'>{data.date}</h6>
            <img src={`${BASE_URL}${data.weather.icon}.png`}/>
            <div className='card__description'>{data.weather.description.toUpperCase()}</div>
            <div className='card__daytime'>
                <div className='card__day'>
                    <h6>Day</h6><span>{data.weather.day_temp} F</span>
                </div>
                <div className='card__night'>
                    <h6>Night</h6><span>{data.weather.night_temp} F</span>
                </div>
            </div>
        </div>
    )
}

export default Card;