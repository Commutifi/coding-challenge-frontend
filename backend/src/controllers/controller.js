const axios = require('axios');
const API_KEY = require('../config');

const getLocations = async (req, res) => {
  const { key } = req.params;
  try {
    const result = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${key}&key=${API_KEY.GEO_API_KEY}&language=en`
    );
    res.status(200).send(result.data);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

const getForecasts = async (req, res) => {
  const { lat, lon } = req.params;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=3&appid=${API_KEY.WEATHER_API_KEY}`
    );
    console.log(result);
    res.status(200).send(result.data);
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

module.exports = {
  getLocations,
  getForecasts,
};
