import ForecastShow from './ForecastShow';
import HistoryList from './HistoryList';
import LocationInput from './LocationInput';
import WeatherDetail from './WeatherDetail';

const ForecastCard = () => {
  return (
    <div className='flex flex-col lg:flex-row m-auto w-full lg:w-[1100px] h-full lg:h-[500px] bg-[url("assets/background.jpg")] bg-cover shadow-2xl'>
      <ForecastShow />

      <div className='flex lg:flex-col lg:pt-10 w-full lg:w-[30%] lg:max-h-full bg-transparent shadow-2xl'>
        <div className='w-2/3 lg:w-fit'>
          <LocationInput />

          <HistoryList />
        </div>

        <WeatherDetail />
      </div>
    </div>
  );
};

export default ForecastCard;
