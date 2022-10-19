import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllPharmecy.css'
// import pharmacy from '../../asserts/pharmacy.jpg'

const AllPharmecy = () =>{

    const navigate = useNavigate();
    const [pharmacy, setPharmacy] = useState([]);
    console.log("🚀 ~ file: AllPharmecy.js ~ line 10 ~ AllPharmecy ~ pharmacy", pharmacy)
    // console.log("🚀 ~ file: Questions.js ~ line 11 ~ Questions ~ questions", questions)

    useEffect(() => {

        const getAllpharmacys = async () => {
            // try {
            //     const res = await axios.get('/api/pharmacy/')
            //     setPharmacy(res.data.AllPharmacy)
            //     console.log(res);
            // } catch (error) {
            //     console.log(error)
            // }
            await axios.get(`/api/pharmacy/`).then((res) => {
                console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
                setPharmacy(res.data.AllPharmacy);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getAllpharmacys(); 
    }, [])


    const navigateToPharmacySchedules = (pharmacyId) => {
        navigate(`/pharmacy/${pharmacyId}`)
    }
    return (
        <div>
            <div className='Qbody'>
                <div className='QTop'>
                    <div className='QRow1'><input className="inputs" type="text" name="title" placeholder='Search' />
                        <button className="btnOrange"  >Search</button>
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
                            {pharmacy.map((pharmacy)=>(
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%"}}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    <img className='pLogo' src='' alt="userlogo"  />
                                                </div>
                                                <div class="col-sm-8 ms-4">
                                                    <div class="row">
                                                        <div class="col-sm-11 mt-3">
                                                            <div className='doctorName'>{pharmacy.PharmacyName} pharmacy<br /></div>
                                                            <div className=''>{pharmacy.StreetAddress}</div>
                                                            <div className=''>{pharmacy.City}</div>
                                                            <div className=''>{pharmacy.State}</div>
                                                            
                                                        </div>
                                                        <div class="col-sm-1 mt-4">
                                                            <center><button className="viewDoctor ms-5 float-start" onClick={() => navigateToPharmacySchedules(pharmacy._id)}>View pharmacy</button></center>
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

export default AllPharmecy