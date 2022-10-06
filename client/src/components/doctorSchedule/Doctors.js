import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './doctorSchedule.css'

const Doctors = () => {

    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [showBtn, setShowButton] = useState(false)
    const [callback, setCallback] = useState(true);

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setShowButton(true)
    }

    const handleResetSearch = (e) => {
        setSearch(e.target.value = '')
        setShowButton(false)
        setCallback(true)
    }


    const handleOnClickSearch = () => {
        setCallback(true)
    }


    useEffect(() => {

        const getAllDoctors = async () => {
            if (callback) {
                try {
                    const res = await axios.get(`/api/doctors?keyword=${search}`)
                    setDoctors(res.data.fetch)
                } catch (error) {
                    console.log(error)
                }
                setCallback(false)
            }

        }
        getAllDoctors();
    }, [callback])


    const navigateToDoctorSchedules = (doctorId) => {
        navigate(`/doctor/${doctorId}/doctorSchedules`)
    }
    return (
        <div>
            <div className='Qbody'>
                <div className='QTop'>
                    <div className='QRow1'><input onChange={handleSearch} className="inputs" value={search} type="text" name="search" placeholder='Search' />
                        <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
                        {
                            showBtn && <button onClick={handleResetSearch} className="btnRed"  >Reset</button>
                        }
                    </div>
                </div>

                <div className='QBottom'>
                    <div className='QBottomL'>
                        <h2 className='brand-title Qleft'>Advance Filter</h2>
                        <hr />
                        <label>By Type</label>
                        <select className="inputs" name="lable" >
                            <option value="" selected>All Types</option>
                            <option value="Allergists">Allergists</option>
                            <option value="Dermatologists">Dermatologists</option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Cardiologists">Cardiologists</option>
                            <option value="Endocrinologists">Endocrinologists</option>
                            <option value="Gastroenterologists">Gastroenterologists</option>
                            <option value="Nephrologists">Nephrologists</option>
                            <option value="Urologists">Urologists</option>
                            <option value="Pulmonologists">Pulmonologists</option>
                            <option value="Otolaryngologists">Otolaryngologists</option>
                            <option value="Psychiatrists">Psychiatrists</option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Radiologists">Radiologists</option>
                            <option value="Rheumatologists">Rheumatologists</option>
                            <option value="General Surgeons">General Surgeons</option>
                            <option value="Orthopedic Surgeons">Orthopedic Surgeons</option>
                            <option value="Cardiac Surgeons">Cardiac Surgeons</option>
                            <option value="Anesthesiologists">Anesthesiologists</option>
                        </select>
                        <div className='Qcenter'>
                            <button className="btnOrange mt-3"  >Filter</button><br /><br />
                            <button className="btnRed"  >Reset</button>
                        </div>
                    </div>
                    <div className='QBottomR'>
                        <div className=''>
                            {doctors.map(doctor => (
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%" }}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    <img className='pLogo' src={doctor.logo} alt="userlogo" style={{ width: "100px", height: "100px", borderRadius: "100px" }} />
                                                </div>
                                                <div class="col-sm-8 ms-4">
                                                    <div class="row">
                                                        <div class="col-sm-11 mt-3">
                                                            <div className='doctorName'>Dr. {doctor.name} <br /></div>
                                                            <div className='doctorType ms-3'>{doctor.doctor?.speciality}</div>

                                                        </div>
                                                        <div class="col-sm-1 mt-4">
                                                            <center><button className="viewDoctor ms-5 float-start" onClick={() => navigateToDoctorSchedules(doctor._id)}>View Doctor</button></center>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Doctors