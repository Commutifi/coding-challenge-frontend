import { useEffect, useState } from 'react'
import { UseAppContext } from '../context/appContext'
import { openCageAPI } from '../apiServices/openCageAPI'
import '../styles/Search.scss'

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [visibility, setVisibility] = useState('')
    const { locationOptions, setLocationOptions, api, setWeatherData, setCurrentLocation } = UseAppContext()

    useEffect(() => {
        const promise = setTimeout(() => {
            if (searchValue !== '') {
                openCageAPI.queryLocationOptions(searchValue)
                    .then((data) => {
                        setLocationOptions(data)
                    })
                    .catch((err) => {
                        console.error()
                    })
            } else {
                setLocationOptions([])
            }
        }, 600)

        return () => {
            clearTimeout(promise)
        }
    }, [searchValue, setLocationOptions])

    async function handleOptionClick(e) {
        const { lat, lon } = e.target.dataset
        const data = await api.openWeatherAPI.fetchThreeDayForcast(lon, lat)
        setVisibility('hidden')
        setSearchValue('')
        setWeatherData(data)
        setCurrentLocation(api.openWeatherAPI.getCurrentLocation())
    }

    function renderSearchResult(locationOptions) {
        if (locationOptions.length > 0 && !visibility) {
            return (
                <ul className={`search__options ${visibility}`}>
                    {locationOptions.map(option => {
                        return <li className='options__item' data-lat={option.lat} data-lon={option.lon} onClick={(e) => handleOptionClick(e)} key={option.id}>{option.value}</li>
                    })}
                </ul>
            )
        }
    }

    return (
        <div className='search'>
            <input value={searchValue} className='search__input' onChange={(e) => { setSearchValue(e.target.value); setVisibility('') }} type='text' placeholder="Search location"></input>
            {renderSearchResult(locationOptions)}
        </div>
    )
}

export default Search