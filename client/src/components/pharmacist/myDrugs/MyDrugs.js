
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DrugReportGenerator from "../drugsReport/DrugReportGenerator";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: "10px",
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderColor: 'red',
};

const MyDrugs = () => {
    const params = useParams();
    const pharmacyId = params.pid;
    const navigate = useNavigate();
    const state = useContext(GlobalState)
    const [token] = state.token
    const [userDetails] = state.userAPI.userDetails
    const [drugs, setDrugs] = useState([]);
    console.log("🚀 ~ file: PharmacyDrugsList.js ~ line 10 ~ PharmacyDrugsList ~ drugs", drugs)
    const [questions, setQuestions] = useState([]);
    const [callback, setCallback] = useState(true);
    const [search, setSearch] = useState('');
    console.log("🚀 ~ file: Questions.js ~ line 17 ~ Questions ~ search", search)
    const [showBtn, setShowButton] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

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

    }, [open])


    const getReport = () => {
        navigate(`/myDrugs/${pharmacyId}/drugReport`)
    }

    const handleNewDrug = () => {
        navigate(`/pharmacist/addDrugsDetails/${pharmacyId}`)
    }
    const editDrug = (drugId) => {
        navigate(`/pharmacist/editDrugsDetails/${drugId}`)
      }

    const handleCancel = () => {
        handleClose()
    }
    const deleteDrugs = async (drugsId) => {
        try {
            const res = await axios.delete(`/api/drugs/delete/${drugsId}`, {
                headers: { Authorization: token }
            });
            console.log(res.data.msg)
            handleClose();
        } catch (error) {
            console.log(error.data.msg);
        }
        // setCallback(true)
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
                        <div className='QRow2 QAlingLeft'> <button className="btnGreen"onClick={() =>DrugReportGenerator(drugs)}>Get Report</button>
                            <div>
                                <button className="btnOrange" onClick={handleNewDrug} > Add New Drug</button>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* {drugs.map(drugs => ( */}
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
                                            {drugs.map(drugs => (
                                            <tbody>

                                                <tr key={drugs.id}>
                                                    <td>{drugs._id}</td>
                                                    <td>{drugs.DrugName}</td>
                                                    <td>{drugs.DrugQuantity}</td>
                                                    <td>{drugs.DrugPrice}</td>
                                                    <td>
                                                        <button className="btnOrange" onClick={() => editDrug(drugs._id)}>Edited</button>
                                                        <button className="cancelBtn" onClick={handleOpen}>Delete</button>
                                                    </td>
                                                </tr>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <div class="container">
                                                            <div class="row">
                                                                <div class="col-sm-11 ">
                                                                    <h2 className='popupTittle' style={{ fontWeight: "bold", fontSize: "22px", color: "red" }}>Delete Visit</h2>
                                                                </div>
                                                                <div class="col-sm-1 ">
                                                                    <img src='' style={{ width: "21px", height: "24px", cursor: "pointer" }} onClick={handleCancel} alt="close" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="ms-2" style={{ fontWeight: "400", fontSize: "20px" }}>Are you want to delete this visit ?</div> <br /><br />
                                                        <div>
                                                            <div className='btncenter'>
                                                                <button className='btnGreen' onClick={handleCancel}>Cancel</button>
                                                                <button className='btnRed' onClick={() => deleteDrugs(drugs._id)}>Delete</button>
                                                            </div>
                                                        </div><br />

                                                    </Box>
                                                </Modal>

                                            </tbody>
                                            ))}
                                        </table>

                                    </div>
                                </center>
                            {/* ))} */}
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default MyDrugs