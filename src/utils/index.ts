import axios from 'axios';

export const getLocationFromGeocode = async (lat: number, lng: number) => {
	try {
		const result = await axios.get(
			`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
		);
		return result?.data?.results?.[0]?.formatted;
	} catch (err: any) {
		throw Error(err.message);
	}
};

export const getColorFromTemperature = (degree: number) => {
	if (degree > 95) return 'red';
	if (degree < 59) return 'blue';
	return 'yellow';
};

export const convertTemperature = (degree: number, unit: string) => {
	if (unit === 'F') return degree.toFixed(2) + '°F';
	return (((degree - 32) * 5) / 9).toFixed(2) + '°C';
};
