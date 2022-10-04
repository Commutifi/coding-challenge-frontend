import React, { useEffect } from 'react';
import { UseAppContext } from './context/appContext';
import './styles/App.scss';

function App() {
  const appContext = UseAppContext()
  
  
  useEffect(() => {
    
    console.log('weatherData',appContext.weatherData)
  })

  return (
    <div>Hello</div>
  )

}

export default App;

