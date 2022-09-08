import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalState } from '../GlobalState';
import AdminPageShell from './admin/AdminPageShell';
import AddDoctorSchedule from './doctorSchedule/AddDoctorSchedule';
import Doctors from './doctorSchedule/Doctors';
import DoctorScheduleForPatient from './doctorSchedule/DoctorScheduleForPatient';
import DoctorScheduleHome from './doctorSchedule/DoctorScheduleHome';
import Login from './login/Login';
import AddPharmacyDetails from './pharmacist/addPharmacyDetails/AddPharmacyDetails';
import PharmacistHome from './pharmacist/pharmacistHome/PharmacistHome';
import Profile from './profile/Profile';
import Questions from './questions/allQuestion/Questions';
import CreateQuestion from './questions/createQuestion/CreateQuestion';
import QuestionDetails from './questions/questionDetails/QuestionDetails';
import Register from './register/Register';
import UpadateProfile from './updateProfile/UpadateProfile';

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
    <Route path='/admin' element={isAdmin&&<AdminPageShell />} />

    <Route path='/signin' element={isLogged?<Navigate to={'/'}/>:<Login />} />
    <Route path='/signup' element={isLogged?<Navigate to={'/'}/>:<Register />} />
    {/* Doctor Routes */}
    <Route path='/doctor' element={<DoctorScheduleHome/>} />
    <Route path='/doctor/addDoctorsSchedule' element={<AddDoctorSchedule/>} />
    {/* Pharmacist */}
    <Route path='/pharmacist/' element={<PharmacistHome/>} />
    <Route path='/pharmacist/addPharmacyDetails' element={<AddPharmacyDetails/>} />
    {/* Profile */}
    <Route path='/profile' element={isLogged&&<Profile />} />
    <Route path='/updateprofile' element={isLogged&&<UpadateProfile />} />
    <Route path='/createQuestion' element={isLogged?<CreateQuestion/>:<Navigate to={'/signin'}/>} />
    <Route path='/doctors' element={<Doctors />} />
    <Route path='/questionDetails/:qID' element={<QuestionDetails/>} />
    <Route path='/doctor/:dId/doctorSchedules' element={<DoctorScheduleForPatient/>}/>
    
    </Routes>
  </div>
  )
}

export default MainPages