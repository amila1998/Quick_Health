import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalState } from '../GlobalState';
import Login from './login/Login';
import Questions from './questions/allQuestion/Questions';
import Register from './register/Register';

const MainPages = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [isDoctor] = state.userAPI.isDoctor
    const [isPharmacist] = state.userAPI.isPharmacist
  return (
    <div className='main'> 
    <Routes>
    <Route path='/' element={<Questions />} />
    <Route path='/signin' element={<Login />} />
    <Route path='/signup' element={<Register />} />
    
    </Routes>
  </div>
  )
}

export default MainPages