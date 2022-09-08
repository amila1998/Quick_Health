import React, { useState } from 'react'
import './adminPageShell.css'
import u from '../../asserts/icons/User Menu Male.png'
import a from '../../asserts/icons/Ask Question.png'
import c from '../../asserts/icons/Clinic.png'
import d from '../../asserts/icons/Medical Doctor.png'
import e from '../../asserts/icons/Tags.png'
import f from '../../asserts/icons/Edit Pie Chart Report.png'


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
                    <div className={AdminDashBoard ? 'select' : 'unselect'}><img src={u} />Admin Dashboard</div>
                    <div className={userManagement ? 'select' : 'unselect'}><img src={u} />User Management</div>
                    <div className={qaManagement ? 'select' : 'unselect'}><img src={a} />Q&A Management</div>
                    <div className={pharmacyManagement ? 'select' : 'unselect'}><img src={c} />Pharmacy Management</div>
                    <div className={doctorManagement ? 'select' : 'unselect'}><img src={d} />Doctor Management</div>
                    <div className={lableManagemnt ? 'select' : 'unselect'}><img src={e} />Lable Management</div>
                    <div className={reports ? 'select' : 'unselect'}><img src={f} />Reports</div>

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
                        reports && <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPageShell