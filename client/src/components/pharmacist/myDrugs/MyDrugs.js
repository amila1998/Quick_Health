
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const MyDrugs = () => {
    const params = useParams();
    const pharmacyId = params.pid;
    const navigate = useNavigate();
    const state = useContext(GlobalState)
    const [userDetails] = state.userAPI.userDetails
    const [drugs, setDrugs] = useState([]);
    console.log("🚀 ~ file: PharmacyDrugsList.js ~ line 10 ~ PharmacyDrugsList ~ drugs", drugs)
    const [questions, setQuestions] = useState([]);
    const [callback, setCallback] = useState(true);
    const [search, setSearch] = useState('');
    console.log("🚀 ~ file: Questions.js ~ line 17 ~ Questions ~ search", search)
    const [showBtn, setShowButton] = useState(false)

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

        const getAllDrugs = async () => {
            await axios.get(`/api/drugs/${pharmacyId}`).then((res) => {
                console.log(res);
                setDrugs(res.data.pharmacyDrug);
            }).catch((err) => {
                console.log(err.massage);
            })

        }

        getAllDrugs();

    }, [])


    const navigateToCreateQuestion = () => {
        navigate('/createQuestion')
    }

    const handleNewDrug = () => {
        navigate(`/pharmacist/addDrugsDetails/${pharmacyId}`)
    }

    return (
        <div>
            <div>
                <div className='Qbody'>
                    <div className='QTop'>
                        <div className='QRow1'><input onChange={handleSearch} className="inputs" value={search} type="text" name="search" placeholder='Search' />
                            <button className="btnOrange" onClick={handleOnClickSearch} >Search</button>
                            {
                                showBtn && <button onClick={handleResetSearch} className="btnRed"  >Reset</button>
                            }

                        </div>
                        <div className='QRow2 QAlingLeft'> <button className="btnGreen">Get Report</button>
                            <div>
                                <button className="btnOrange" onClick={handleNewDrug} > Add New Drug</button>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <center>
                                <div className="PhTBody">
                                    <table id="PhTable">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Drug Name</th>
                                                <th>Quantity</th>
                                                <th>Drug price</th>
                                                <th>       </th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {drugs.map(drugs => (
                                                <tr key={drugs.id}>
                                                    <td>{drugs._id}</td>
                                                    <td>{drugs.DrugName}</td>
                                                    <td>{drugs.DrugQuantity}</td>
                                                    <td>{drugs.DrugPrice}</td>
                                                    <td>
                                                        <button className="btnOrange">Edited</button>
                                                        <button className="cancelBtn">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </center>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default MyDrugs