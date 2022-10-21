import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AllPharmecy.css'
// import pharmacy from '../../asserts/pharmacy.jpg'

const AllPharmecy = () =>{

    const navigate = useNavigate();
    const [pharmacy, setPharmacy] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filterInput, setFilterInput] = useState('');
    console.log("🚀 ~ file: AllPharmecy.js ~ line 14 ~ AllPharmecy ~ filterInput", filterInput)
    const [showBtn, setShowButton] = useState(false)
    
    console.log("🚀 ~ file: AllPharmecy.js ~ line 13 ~ AllPharmecy ~ searchInput", searchInput)
    console.log("🚀 ~ file: AllPharmecy.js ~ line 12 ~ AllPharmecy ~ searchTerm", searchTerm)
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

    const handleOnClickSearch = (e) => {
        setSearchTerm(searchInput)
        setShowButton(true)
    }
    const handleResetSearch = (e) => {
        setSearchTerm(e.target.value = '')
        setShowButton(false)
    }
    const handleOnClickFilter = (e) => {
        setSearchTerm(filterInput)
        setShowButton(true)
    }
   
    const filteredCountries = pharmacy.filter(pharmacy => {
        return (pharmacy.PharmacyName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                pharmacy.StreetAddress.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                pharmacy.City.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                pharmacy.State.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    
    })

    const navigateToPharmacySchedules = (pharmacyId) => {
        navigate(`/pharmacy/${pharmacyId}`)
    }
    return (
        <div>
            <div className='Qbody'>
                <div className='QTop'>
                    <div className='QRow1'>
                        <input className="inputs" type="text" name="Search" placeholder='Search' onChange={(e)=>setSearchInput(e.target.value)}
                        />
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
                        <label>By location</label>
                        <select className="inputs" name="lable" onChange={(e)=>setFilterInput(e.target.value)}>
                            <option value="" selected>All Types</option>
                            <option value="Ampara">Ampara</option>
                            <option value="Anuradhapura">	Anuradhapura</option>
                            <option value="Badulla">Badulla</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Galle">Galle</option>
                            <option value="Gampaha">Gampaha</option>
                            <option value="Hambantota">Hambantota</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Kalutara">Kalutara</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Kegalle">Kegalle</option>
                            <option value="Kilinochchi">Kilinochchi</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Mannar">Mannar</option>
                            <option value="Matale">Matale</option>
                            <option value="Matara">Matara</option>
                            <option value="Moneragala">Moneragala</option>
                            <option value="Mullaitivu">Mullaitivu</option>
                            <option value="Nuwara Eliya">Nuwara Eliya</option>
                            <option value="Polonnaruwa">Polonnaruwa</option>
                            <option value="Ratnapura">Ratnapura</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Vavuniya">Vavuniya</option>
                        </select>
                        <div className='Qcenter'>
                            <button className="btnOrange mt-3" onClick={handleOnClickFilter} >Filter</button><br /><br />
                            {
                               showBtn && <button className="btnRed" onClick={handleResetSearch} >Reset</button>
                            }
                        </div>
                    </div>
                    <div className='QBottomR'>
                        <div className=''>
                            {filteredCountries.map((pharmacy,index)=>(
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%"}}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    <img className='pLogo' src='https://res.cloudinary.com/quick-health/image/upload/v1666282124/DrugPicture/istockphoto-1275720974-612x612_babp6v.jpg' alt="userlogo" style={{ width: "100px", height: "100px" }} />
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