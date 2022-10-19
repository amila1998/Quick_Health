import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PharmacyDrug = () => {

    const navigate = useNavigate();
    const [drugs,setDrug] = useState([]);
    const [OnePharmacy,setOnePharmacy] = useState('');
    console.log("🚀 ~ file: PharmacyDrug.js ~ line 10 ~ PharmacyDrug ~ OnePharmacy", OnePharmacy)
    console.log("🚀 ~ file: PharmacyDrug.js ~ line 9 ~ PharmacyDrug ~ drugs", drugs)
    
    const params=useParams();
    const PharmacyID=params.dID;
    console.log("🚀 ~ file: PharmacyDrug.js ~ line 12 ~ PharmacyDrug ~ PharmacyID", PharmacyID)
    // console.log("🚀 ~ file: Questions.js ~ line 11 ~ Questions ~ questions", questions)

    useEffect(() => {

        const getAllDrug = async () => {
            await axios.get(`/api/drugs/${PharmacyID}`).then((res) => {
                console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
                setDrug(res.data.pharmacyDrug);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getAllDrug();
    }, [])
    useEffect(() => {

        const getOnePharmacys = async () => {
            await axios.get(`/api/onePharmacy/${PharmacyID}`).then((res) => {
                console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
                setOnePharmacy(res.data.OnePharmacy);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getOnePharmacys();
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
                        <h2 className='brand-title Qleft'>Advance Filter{OnePharmacy.PharmacyName}</h2>
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
                            {drugs.map((drugs)=>(
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%"}}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    {/* <img className='pLogo' src={drugs} alt="userlogo"  /> */}
                                                </div>
                                                <div class="col-sm-8 ms-4">
                                                    <div class="row">
                                                        <div class="col-sm-11 mt-3">
                                                            <div className='doctorName'>{drugs.DrugName}<br /></div>
                                                            <div className=''>{drugs.DrugPrice}</div>
                                                            <div className=''>{drugs.DrugQuantity}</div>
                                                            <div className=''>{drugs.Description}</div>
                                                            
                                                        </div>
                                                        <div class="col-sm-1 mt-4">
                                                            {/* <center><button className="viewDoctor ms-5 float-start" onClick={() => navigateToPharmacySchedules(pharmacy._id)}>View pharmacy</button></center> */}
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

export default PharmacyDrug