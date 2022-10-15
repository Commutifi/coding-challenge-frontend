import React, { useState, useEffect, useRef } from "react";
import WeatherCard from "./WeatherCard";
import styles from '../styles/weather.module.scss'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import Spinner from '../media/spinner2.mp4'
import env from "react-dotenv";


export default function Weather() {
    const [apiData, setApiData] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [cards, setCards] = useState({});
    const [userInput, setUserInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(true)
    const [showError, setShowError] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const ref = useRef()
    const API_KEY = env.API_KEY;

    useEffect(() => {
        if (!userInput) setFilteredCities([])
    }, [userInput, cards])

    useEffect(() => {
        if (Object.keys(cards).length === 0) setIsFocused(false)
    }, [cards])

    async function getCoordinates(city) {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
            const data = await response.json()
            return data
        } catch (err) {
            throw new Error(err)
        }
    }
    async function getForecast(lat, lon) {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}
                `)

            const data = await response.json()
            return data.list
        } catch (err) {
            throw new Error(err)
        }
    }


    const displayCities = async (e) => {
        const { value } = e.target
        const userCity = value.toLowerCase()
        setUserInput(userCity)
        const api_props = await getCoordinates(userCity)
        setApiData(api_props)
        setFilteredCities(api_props)
        return api_props
    }


    const handleClick = async (lat, lon, name, state) => {
        setShowError(false)
        try {
            const forecastData = await getForecast(lat, lon)
            if (forecastData) {
                const days = {
                    today: { day: 'Today', ...forecastData[0] },
                    tomorrow: { day: 'Tomorrow', ...forecastData[7] },
                    DAT: { day: 'DAT', ...forecastData[14] },

                }
                setCards(prev => ({ ...prev, [name]: { state, days } }))
                setFilteredCities([])
                setUserInput('')
            }
        } catch (err) {
            setShowError(true)
        }
    }

    const removeCard = (clickedCity) => {
        setCards(prev => {
            const minusCard = { ...prev }
            delete minusCard[clickedCity]
            return minusCard
        })
    }

    const searchForCities = () => {
        setIsFocused(true)
        ref.current.focus()
    }

    return (
        <div className={styles.weather}>
            {isLoaded &&
                <>
                    <div className={styles.weatherSearch}>
                        <h1>CommutiCast</h1>
                        <p style={{ paddingBottom: '1rem' }}>Check the weather, anticipate your commute</p>
                        <article>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                            </svg>

                            <input type="text" value={userInput} placeholder="Search city" onChange={displayCities} ref={ref} />
                        </article>
                        <div className={styles.container}>
                            {filteredCities.length > 0 && Object.entries(filteredCities).map(([elem, val], ix) => {
                                const { lat, lon, name, state } = val
                                return (
                                    <div className={styles.chip} key={ix} onClick={() => handleClick(lat, lon, name, state)}>
                                        <p><span>{name}</span>{state ? `, ${state}` : ''}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {showError && <p className={styles.errorMsg}>Oh no, something went wrong while fetching your data. Please try again.</p>}

                    <section className={styles.cardsPreview}>

                        {Object.entries(cards).map(([city, value], ix) => <WeatherCard key={ix} city={city} {...value} removeCard={() => removeCard(city)} />)}
                    </section>
                </>}
            {Object.keys(cards).length === 0 &&
                <div className={styles.mockupCard}>

                    {!isFocused ?
                        <h4>
                            Click the <span>+</span> button to add your first card
                        </h4> :
                        <h4>
                            Type and select your <br></br><span>desired city</span>
                        </h4>}
                    {isFocused ? <video autostart="true" autoPlay loop src={Spinner} onClick={searchForCities} type="video/mp4" /> : <PlusCircleIcon onClick={searchForCities} />}
                </div>
            }
        </div>
    )
}

