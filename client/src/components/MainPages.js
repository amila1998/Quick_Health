import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalState } from '../GlobalState';
import AdminPageShell from './admin/AdminPageShell';
import AddDoctorSchedule from './doctorSchedule/AddDoctorSchedule';
import Doctors from './doctorSchedule/Doctors';
import DoctorScheduleForPatient from './doctorSchedule/DoctorScheduleForPatient';
import DoctorScheduleHome from './doctorSchedule/DoctorScheduleHome';
import EditDoctorSchedule from './doctorSchedule/EditDoctorSchedule';
import DoctorScheduleReport from './doctorSchedule/report/DoctorScheduleReport';
import Login from './login/Login';
import AddDrugsDetails from './pharmacist/addDrugsDetails/AddDrugsDetails';
import AddPharmacyDetails from './pharmacist/addPharmacyDetails/AddPharmacyDetails';
import Drugs from './pharmacist/drugsReport/Drugs';
import EditDrugsDetails from './pharmacist/editDrugsDetails/EditDrugsDetails';
import MyDrugs from './pharmacist/myDrugs/MyDrugs';
import PharmacistHome from './pharmacist/pharmacistHome/PharmacistHome';
import PharmacyDrugsList from './pharmacist/pharmacyDrugsList/PharmacyDrugsList';
import AllPharmecy from './pharmecy/AllPharmecy/AllPharmecy';
import PharmacyDrug from './pharmecy/pharmacyDrug/PharmacyDrug';
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
    <Route path='/doctor/addDoctorsSchedule' element={isDoctor?<AddDoctorSchedule/>:<Navigate to={'/signin'}/>}/>
    <Route path='/doctor/:dId/doctorSchedules' element={<DoctorScheduleForPatient/>}/>
    <Route path='/doctors' element={<Doctors />} />
    <Route path='/doctor/editDoctorSchedule/:doctorScheduleId' element={isDoctor?<EditDoctorSchedule/>:<Navigate to={'/signin'}/>} />
    <Route path='/doctor/:dId/doctorScheduleReport' element={<DoctorScheduleReport/>}/>
    {/* Pharmacist */}
    <Route path='/pharmacist/' element={<PharmacistHome/>} />
    <Route path='/myDrugs/:pid' element={<MyDrugs/>} />
    <Route path='/myDrugs/:pid/drugReport' element={<Drugs/>} />
    <Route path='/pharmacist/addPharmacyDetails' element={<AddPharmacyDetails/>} />
    <Route path='/pharmacist/pharmacyDrugsList' element={<PharmacyDrugsList/>} />
    <Route path='/pharmacist/addDrugsDetails/:pid' element={<AddDrugsDetails/>} />
    <Route path='/pharmacist/editDrugsDetails/:pid' element={<EditDrugsDetails/>} />
    {/* pharmacy  */}
    <Route path='/pharmacy/' element={<AllPharmecy/>} />
    <Route path='/pharmacy/:dID' element={<PharmacyDrug/>} />

    {/* Profile */}
    <Route path='/profile' element={isLogged&&<Profile />} />
    <Route path='/updateprofile' element={isLogged&&<UpadateProfile />} />
    <Route path='/createQuestion' element={isLogged?<CreateQuestion/>:<Navigate to={'/signin'}/>} />
   
    <Route path='/questionDetails/:qID' element={<QuestionDetails/>} />
    
    
    </Routes>
  </div>
  )
}

export default MainPages