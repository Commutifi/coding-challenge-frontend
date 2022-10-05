import { useEffect, useState } from 'react'
import { UseAppContext } from '../context/appContext'
import Card from '../components/Card'
import '../styles/Forecast.scss'

function Forecast() {
    const { locationOptions, setLocationOptions, weatherData } = UseAppContext()
    console.log(weatherData)
    function renderCards(){
        if(weatherData.length > 0) {
            return (
                weatherData.map((card) => {
                    console.log('card', card)
                    return <Card key={card.id} data={card}/>
                })
            )
        }
    } 
    return (
        <>
            {renderCards()}
        </>
    )
}

export default Forecast;