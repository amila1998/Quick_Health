import { green } from '@mui/material/colors';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PharmacyDrug = () => {

    const navigate = useNavigate();
    const params = useParams();
    const PharmacyID = params.dID;
    const [drugs, setDrug] = useState([]);
    const [OnePharmacy, setOnePharmacy] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    console.log("🚀 ~ file: PharmacyDrug.js ~ line 13 ~ PharmacyDrug ~ searchTerm", searchTerm)
    const [searchInput, setSearchInput] = useState('');
    console.log("🚀 ~ file: PharmacyDrug.js ~ line 14 ~ PharmacyDrug ~ searchInput", searchInput)
    const [showBtn, setShowButton] = useState(false)



    const getAllDrug = async () => {
        await axios.get(`/api/drugs/${PharmacyID}`).then((res) => {
            console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
            setDrug(res.data.pharmacyDrug);
        }).catch((err) => {
            console.log(err.massage);
        })
    }
    const getOnePharmacy = async () => {
        await axios.get(`/api/onePharmacy/${PharmacyID}`).then((res) => {
            console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
            setOnePharmacy(res.data.AllPharmacy);
        }).catch((err) => {
            console.log(err.massage);
        })
    }
    useEffect(() => {

        getOnePharmacy();
        getAllDrug();

    }, [])

    const handleOnClickSearch = (e) => {
        setSearchTerm(searchInput)
        setShowButton(true)
    }
    const handleResetSearch = (e) => {
        setSearchTerm(e.target.value = '')
        setShowButton(false)
    }

    const filteredCountries = drugs.filter(drugs => {
        return (drugs.DrugName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            drugs.DrugPrice.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            drugs.DrugQuantity.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            drugs.Description.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

    })

    return (
        <div>
            <div className='Qbody'>
                <div className='QTop'>
                    <div className='QRow1'><input className="inputs" type="text" name="title" placeholder='Search' onChange={(e) => setSearchInput(e.target.value)} />
                        <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
                        {
                            showBtn && <button onClick={handleResetSearch} className="btnRed"  >Reset</button>
                        }
                    </div>
                </div>

                <div className='QBottom'>
                    <div className='QBottomL'>

                        <h2 className='brand-title Qleft'>{OnePharmacy.PharmacyName}Pharmacy</h2>
                        <hr />
                        <center>
                            {OnePharmacy.StreetAddress},
                            <br />
                            {OnePharmacy.City},
                            <br />
                            {OnePharmacy.State}.
                            <br />
                            {OnePharmacy.number}
                            <br/>
                            OpenTime: {OnePharmacy.OpenTime} CloseTime: {OnePharmacy.CloseTime}
                        </center>
                        {/* OpenTime: {OnePharmacy.OpenTime} CloseTime: {OnePharmacy.CloseTime} */}
                        {/* <h4 className='brand-title Qleft'>CloseTime{OnePharmacy.CloseTime}</h4> */}

                        {/* <label>By Type</label> */}


                    </div>
                    <div className='QBottomR'>
                        <div className=''>
                            {filteredCountries.map((drugs, index) => (
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%" }}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    <img className='pLogo' src={drugs.DrugImage} alt="userlogo" style={{ width: "100px", height: "100px" }} />
                                                </div>&nbsp;&nbsp;
                                                <div class="col-sm-8 ms-4">
                                                    <div class="row">
                                                        <div class="col-sm-11 mt-3">
                                                            <div className='doctorName'>{drugs.DrugName}<br /></div>
                                                            <div className=''>{drugs.DrugPrice}</div>
                                                            <div className=''>{drugs.DrugQuantity}</div>
                                                            <div className=''>{drugs.Description}</div>

                                                        </div>
                                                        <div class="col-sm-1 mt-4">

                                                            {drugs.DrugQuantity &&
                                                               <center>
                                                                
                                                                    <p>
                                                                    <span style={{color:'green'}}>available</span>{' '}
                                                                    </p>
                                                                
                                                            </center>
                                                            }
                                                            {!drugs.DrugQuantity &&
                                                                <center>
                                                                
                                                                    <p>
                                                                    <span style={{color:'red'}}>Not&nbsp;available</span>{' '}
                                                                    </p>
                                                                
                                                            </center>
                                                            }
                                                            
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