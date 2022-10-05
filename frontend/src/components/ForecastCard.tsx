import ForecastShow from './ForecastShow';
import HistoryList from './HistoryList';
import LocationInput from './LocationInput';
import WeatherDetail from './WeatherDetail';

const ForecastCard = () => {
  return (
    <div className='grid grid-cols-10 m-auto w-[1100px] h-[500px] bg-[url("assets/background.jpg")] bg-cover shadow-2xl'>
      <ForecastShow />

      <div className='pt-10 col-span-3 max-h-full bg-transparent shadow-2xl'>
        <LocationInput />

        <HistoryList />

        <WeatherDetail />
      </div>
    </div>
  );
};

export default ForecastCard;
