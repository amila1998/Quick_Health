import React, { useState } from 'react'
import './adminPageShell.css'
import u from '../../asserts/icons/User Menu Male.png'
import a from '../../asserts/icons/Ask Question.png'
import c from '../../asserts/icons/Clinic.png'
import d from '../../asserts/icons/Medical Doctor.png'
import e from '../../asserts/icons/Tags.png'
import f from '../../asserts/icons/Edit Pie Chart Report.png'
import Reports from './reports/Reports'


const AdminPageShell = () => {
    const [AdminDashBoard, setAdminDashboard] = useState(true)
    const [userManagement, setUserManagement] = useState(false)
    const [qaManagement, setQAManagemnt] = useState(false)
    const [pharmacyManagement, setPharmacyManagement] = useState(false)
    const [doctorManagement, setDoctorManagemnt] = useState(false)
    const [lableManagemnt, setLableManagemnt] = useState(false)
    const [reports, setReports] = useState(false)

    const handleAdminDashBoard = () => {
        setAdminDashboard(true)
        setUserManagement(false)
        setQAManagemnt(false)
        setDoctorManagemnt(false)
        setPharmacyManagement(false)
        setLableManagemnt(false)
        setReports(false)
      
    }
    const handleUserManagement = () => {
        setAdminDashboard(false)
        setUserManagement(true)
        setQAManagemnt(false)
        setDoctorManagemnt(false)
        setPharmacyManagement(false)
        setLableManagemnt(false)
        setReports(false)
   
    }
    const handleQAManagemnt = () => {
        setAdminDashboard(false)
        setUserManagement(false)
        setQAManagemnt(true)
        setDoctorManagemnt(false)
        setPharmacyManagement(false)
        setLableManagemnt(false)
        setReports(false)
  
    }
    const handlePharmacyManagement = () => {
        setAdminDashboard(false)
        setUserManagement(false)
        setQAManagemnt(false)
        setDoctorManagemnt(false)
        setPharmacyManagement(true)
        setLableManagemnt(false)
        setReports(false)
     
    }
    const handleDoctorManagemnt = () => {
        setAdminDashboard(false)
        setUserManagement(false)
        setQAManagemnt(false)
        setDoctorManagemnt(true)
        setPharmacyManagement(false)
        setLableManagemnt(false)
        setReports(false)
     
    }
    const handleLableManagemnt = () => {
        setAdminDashboard(false)
        setUserManagement(false)
        setQAManagemnt(false)
        setDoctorManagemnt(false)
        setPharmacyManagement(false)
        setLableManagemnt(true)
        setReports(false)
      
    }
    const handleReports = () => {
        setAdminDashboard(false)
        setUserManagement(false)
        setQAManagemnt(false)
        setDoctorManagemnt(false)
        setPharmacyManagement(false)
        setLableManagemnt(false)
        setReports(true)
     
    }
    return (
        <div>
            <div className='Abody' >
                <div className='Aleft'>
                    <div onClick={handleAdminDashBoard} className={AdminDashBoard ? 'select' : 'unselect'}><img src={u} />Admin Dashboard</div>
                    <div onClick={handleUserManagement} className={userManagement ? 'select' : 'unselect'}><img src={u} />User Management</div>
                    <div onClick={handleQAManagemnt} className={qaManagement ? 'select' : 'unselect'}><img src={a} />Q&A Management</div>
                    <div onClick={handlePharmacyManagement} className={pharmacyManagement ? 'select' : 'unselect'}><img src={c} />Pharmacy Management</div>
                    <div onClick={handleDoctorManagemnt} className={doctorManagement ? 'select' : 'unselect'}><img src={d} />Doctor Management</div>
                    <div onClick={handleLableManagemnt} className={lableManagemnt ? 'select' : 'unselect'}><img src={e} />Lable Management</div>
                    <div onClick={handleReports} className={reports ? 'select' : 'unselect'}><img src={f} />Reports</div>

                </div>
                <div className='ARight'>
                    {
                        AdminDashBoard && <></>
                    }
                    {
                        userManagement && <></>
                    }
                    {
                        qaManagement && <></>
                    }
                    {
                        pharmacyManagement && <></>
                    }
                    {
                        doctorManagement && <></>
                    }
                    {
                        reports && <><Reports/></>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPageShell