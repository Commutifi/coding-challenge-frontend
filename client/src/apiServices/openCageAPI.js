class OpenCageAPI {
    BASE_URL = process.env.REACT_APP_OPEN_CAGE_BASE_URL
    API_KEY = process.env.REACT_APP_OPEN_CAGE_API_KEY

    async queryLocationOptions(queryString) {
        try {
            const response = await fetch(`${this.BASE_URL}q=${queryString}&key=${this.API_KEY}&language=en`)
            const data = await response.json()
            const options = data.results.map((location) => {
                const locationData = {
                    lon: null,
                    lat: null,
                    value: null,
                    id: null
                }

                locationData.lon = location.geometry.lng
                locationData.lat = location.geometry.lat
                locationData.value = location.formatted
                locationData.id = location.annotations.geohash

                return locationData
            })

            return options
        } catch (err) {
            console.error(err)
        }
    }

    async transformCoordsToLocation(lat, lon) {
        try {
            const response = await fetch(`${this.BASE_URL}q=${lat},${lon}&key=${this.API_KEY}&language=en`)
            const data = await response.json()

            return {
                city: data.results[0].components.city,
                country: data.results[0].components.country,
                village: data.results[0].components.village,
                county: data.results[0].components.county
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const openCageAPI = new OpenCageAPI()