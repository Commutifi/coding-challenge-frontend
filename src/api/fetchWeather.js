import axios from 'axios'
//first step like all those apis i save the key and URl
const url = 'https://api.openweathermap.org/data/2.5/forecast'
const key = 'b81cd1a66eaee287ea9830aa66250511'

/**
 * It takes a query and a messure as arguments and returns the data from the API
 * @param query - The city name or zip code
 * @param messure - metric or imperial
 * @returns The data object is being returned.
 */
const fetchWeather = async (query, messure) => {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      units: messure, //these are the supported in the APi
      APPID: key,
    },
  })
  return data
}

export default fetchWeather
