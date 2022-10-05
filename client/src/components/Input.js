import { useEffect, useState } from 'react'
import { UseAppContext } from '../context/appContext'
import { openCageAPI } from '../services/openCageAPI'

function Input({ options }) {
    const [searchValue, setSearchValue] = useState('')
    const { locationOptions, setLocationOptions } = UseAppContext()

    // useEffect(() => {
    //     const promise = setTimeout(() => {
    //         if (searchValue !== '') {
    //             openCageAPI.queryLocationOptions(searchValue)
    //                 .then((data) => {
    //                     console.log('DATA FROM QUERRY', data)
    //                     setLocationOptions(data)
    //                 })
    //                 .catch((err) => {
    //                     console.error()
    //                 })
    //         } else {
    //             setLocationOptions([])
    //         }
    //     }, 600)

    //     return () => {
    //         clearTimeout(promise)
    //     }
    // }, [searchValue])

    function renderSearchResult(locationOptions) {
        if (locationOptions.length > 0) {
            return (
                <ul>
                    {locationOptions.map(option => {
                        return <li key={option.id}>{option.value}</li>
                    })}
                </ul>
            )
        }
    }

    return (
        <div>
            <input onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder="Search location"></input>
            {renderSearchResult(locationOptions)}
        </div>
    )
}

export default Input;