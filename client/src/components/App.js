import React from 'react'
import { UseAppContext } from '../context/appContext'
import Search from './Search'
import Forecast from '../components/Forecast'
import Header from '../components/Header'
import '../styles/App.scss'

function App() {
  const appContext = UseAppContext()
  return (
    <main className='main'>
      <section className='main__search'>
        <Search />
      </section>
      {!appContext.currentLocation ? <div className='main__warning'>PLEASE ENABLE YOUR CHROME GEOLOCATION SERVICE</div> : <></>}
      <section className='main__location'>
        <Header />
      </section>
      <section className='main__forecast'>
        <Forecast />
      </section>
    </main>
  )
}

export default App