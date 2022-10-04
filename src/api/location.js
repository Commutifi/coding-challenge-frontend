import axios from 'axios'
//first step like all those apis i save the key and URl

const key = '066c930b1b9f4d9bb89733fb93e9827b'

const location = async (lat, long) => {
  /* A function that takes two parameters lat and long and it is using axios to get the data from the
 api and then it is splitting the timezone and returning the city. */
  if (lat || long) {
    const { data } = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${key}&pretty=1`
    )
    let timezone = data.results[0].annotations.timezone.name
    let city = await timezone.split('/')[1]
    // console.log(city)
    return city && city
  }
}

export default location
