import axios from 'axios';

export const getLocationFromGeocode = async (lat: number, lng: number) => {
	const result = await axios.get(
		`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
	);
  return result?.data?.results?.[0]?.formatted
};
