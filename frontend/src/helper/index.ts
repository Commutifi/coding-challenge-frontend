const filterLocations = (arr: Array<any>) => {
  return arr.map((elem) => {
    return {
      location: elem.formatted,
      lat: elem.geometry.lat,
      lng: elem.geometry.lng,
    };
  });
};

const addMoreInfo = (arr: Array<any>, location: string) => {
  return arr.map((elem) => {
    return {
      ...elem,
      temp: {
        ...elem.temp,
        avg: Math.floor((elem.temp.min + elem.temp.max) / 2),
      },
      location,
    };
  });
};

const convertToC = (value: number) => {
  return Math.floor(((value - 32) * 5) / 9);
};

const convertToF = (value: number) => {
  return Math.floor((value * 9) / 5 + 32);
};

const weatherType = (value: string) => {
  return weatherMap.get(value);
};

const weatherMap = new Map();
weatherMap.set('Rain', 'Rainy');
weatherMap.set('Clouds', 'Cloudy');
weatherMap.set('Clear', 'Sunny');
weatherMap.set('Snow', 'Snowy');

const Helper = {
  filterLocations,
  addMoreInfo,
  convertToC,
  convertToF,
  weatherType,
};

export default Helper;
