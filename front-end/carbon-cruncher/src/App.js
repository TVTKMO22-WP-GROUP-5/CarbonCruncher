import React, { useEffect, useState } from 'react'
import './App.css'
import { Assets } from './assets/Assets'
import { ENDPOINTS, createAPIEndpoint } from './api'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import IconButton from './components/IconButton/IconButton'

function App() {
  const [ user, setUser ] = useState( null )

  useEffect( () => {
    createAPIEndpoint( ENDPOINTS.visu1.annual )
      .fetch()
      .then( res => {
        console.log( res )
      } )
      .catch( err => console.log( err ) )
  }, [] )
  
  return (
    <BrowserRouter>
      <div className='main-container'>
        <div className='sidebar left-section'>
          <img src={ Assets.logo.text } alt='logo' />
          <div className='side-button-container'>
            <IconButton icon={ Assets.icon.histTemp } text='Historic Temperatures' />
            <IconButton icon={ Assets.icon.evoGlobalTemp } text='Evolution of Global Temperature' />
            <IconButton icon={ Assets.icon.atmCo2 } text='Atmospheric & Antarctic CO2 Concentrations' />
            <IconButton icon={ Assets.icon.countryCo2 } text='CO2 Emissions by Country' />
            <IconButton icon={ Assets.icon.sectorCo2 } text='Atmospheric & Antarctic CO2 Concentrations' />
          </div>
        </div>
        <div className='middle-section'>
          <div className='navbar'>
            <Link to='/'><a>Temperature and CO2 Data</a></Link>
            <Link to='eka'><a>Emission Sources</a></Link>
            <Link to='toka'><a>User Custom View</a></Link>
            <Link to='toka'><a>Logout</a></Link>
          </div>
          <div className='middle-content'>
            <Routes>
              <Route path='/main' element={ <h1>main</h1> } />
              <Route path='/eka' element={ <h1>eka</h1> } />
              <Route path='/toka' element={ <h1>toka</h1> } />
            </Routes>
          </div>
        </div>
        <div className='sidebar right-section'>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
