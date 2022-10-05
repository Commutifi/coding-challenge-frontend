import React, { useEffect } from 'react';
import { UseAppContext } from '../context/appContext';
import Input from '../components/Input'
import Card from '../components/Card'
import Forecast from '../components/Forecast'
import '../styles/App.scss';

function App() {
  const appContext = UseAppContext()


  useEffect(() => {

  })
  console.log('weatherData', appContext.weatherData)

  return (
    <main className='main'>
      <section className='main__input'>
        <Input options={[1, 2]} />
      </section>
      <section className='main__forecast'>
        <Forecast />
      </section>
      
    </main>
  )
}

export default App;

