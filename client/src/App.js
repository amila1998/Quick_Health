import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainPages from './components/MainPages';
import { DataProvider } from './GlobalState';
import './App.css'

const App = () => {
  return (
    <DataProvider>
      <div className=''>
        <Router>
          <div><Header /></div>
          <div>
            <MainPages />

          </div>
          <div>  <Footer /></div>
        </Router>
      </div>
    </DataProvider>
  )
}

export default App
