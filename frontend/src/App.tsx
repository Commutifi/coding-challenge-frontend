import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { RootState } from './redux/store';

import 'react-toastify/dist/ReactToastify.css';

import ForecastCard from './components/ForecastCard';

const App = () => {
  const location = useSelector((root: RootState) => root.location);

  useEffect(() => {
    if (location.status === 'ERROR') {
      toast.error(location?.message || '');
    }
  });

  return (
    <>
      <div className='w-screen h-screen bg-[url("assets/background.jpg")]'>
        <div className='px-10 xl:px-0 w-full h-full bg-transparent backdrop-blur-lg flex'>
          <ForecastCard />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
