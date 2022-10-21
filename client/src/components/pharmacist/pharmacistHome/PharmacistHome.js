import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './PharmacistHome.css'
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddPharmacyDetails from '../addPharmacyDetails/AddPharmacyDetails';
import EditPharmacyDetails from '../editPharmacyDetails/EditPharmacyDetails';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    opacity: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const PharmacistHome = () => {
    const gState = useContext(GlobalState)
    const [isLogged] = gState.userAPI.isLogged
    const [isAdmin] = gState.userAPI.isAdmin
    const [isDoctor] = gState.userAPI.isDoctor
    const [isPharmacist] = gState.userAPI.isPharmacist
    const [userDetails] = gState.userAPI.userDetails
    console.log("🚀 ~ file: PharmacistHome.js ~ line 35 ~ PharmacistHome ~ userDetails", userDetails._id)
    const [token] = gState.token
    const [uID, setUID] = useState("63164c9b8276fedf6c71c238");
    console.log("🚀 ~ file: PharmacistHome.js ~ line 38 ~ PharmacistHome ~ uID", uID)

    const [userID, setUserID] = useState([]);
    // console.log("🚀 ~ file: PharmacistHome.js ~ line 22 ~ PharmacistHome ~ userID", userID)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [dOpen, setDOpen] = useState(false);
    const DhandleOpen = () => setDOpen(true);
    const DhandleClose = () => setDOpen(false);
    const handleCancel = () => {
        DhandleClose()
    }
    const [eOpen, setEOpen] = useState(false);
    const EhandleOpen = () => setEOpen(true);
    const EhandleClose = () => setEOpen(false);
    const EhandleCancel = () => {
        EhandleClose()
    }

    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/auth/logout', {
                headers: { Authorization: token }
            })
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.sessionStorage.clear();
            localStorage.clear();
            window.location.href = "/";
        } catch (err) {
            console.log("🚀 ~ file: UpadateProfile.js ~ line 125 ~ handleSubmit ~ err", err)
            toast.error(err.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }




    const handleUpdate = () => {

        navigate('/updateprofile');

    }
    const navigateToMyDrugs = (pharmacyId) => {

        navigate(`/myDrugs/${pharmacyId}`);
    }
    const editDrug = (drugId) => {
        navigate(`/pharmacist/editDrugsDetails/${drugId}`)
    }
    useEffect(() => {
        const getUserId = async () => {
            await axios.get(`/api/pharmacy/${userDetails._id}`, {
                headers: { Authorization: token }
            }).then((res) => {
                console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
                setUserID(res.data.pharmacy);
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getUserId();
    }, [userDetails, open, dOpen,eOpen])

    const deletePharmacy = async (pharmacyId) => {
        try {
            const res = await axios.delete(`/api/pharmacy/deletePharmacy/${pharmacyId}`, {
                headers: { Authorization: token }
            });
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            DhandleClose();
        } catch (error) {
            console.log(error.data.msg);
        }
        // setCallback(true)
    }

    return (
        <div>
            <div className='phMain'>

                <div className='layout'>
                    <ToastContainer />
                    <div className='Phbody'>
                        <h2 className='brand-title Qleft'>My Pharmacies</h2>
                        <hr />
                        <br />
                        <div>
                            <button className="btnGreen" onClick={handleOpen} > Add New Pharmacy</button>
                            <Modal
                                open={open}
                                onClose={handleClose}

                            >
                                <Box sx={style}>


                                    <AddPharmacyDetails setOpen={setOpen} />

                                </Box>
                            </Modal>
                        </div>
                        <br />


                        {/* <div className='Phdetails'>
                            {
                                userID.map((uid) => (
                                    <>
                                        <div className='phL '>

                                            <div className='phRow'>
                                                <div>
                                                    <label className='phifo'><a href='/pharmacist/pharmacyDrugsList'>{userDetails.role}</a></label>
                                                </div>
                                            </div>


                                            {
                                                isPharmacist && <>

                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.PharmacyName} Pharmacy</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.StreetAddress},</label> <label className='phifo'>{uid.City},</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.City}</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.State}.</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.OpenTime}</label><label className='phifo'>{uid.CloseTime}</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <label className='phifo'>{uid.number}</label>
                                                        </div>
                                                    </div>
                                                    <div className='phRow'>
                                                        <div>
                                                            <button onClick={() => navigateToMyDrugs(uid._id)} > View Drugs </button>
                                                            <button className="btnOrange" onClick={EhandleOpen}>Edited</button>
                                                            <button className="cancelBtn" onClick={DhandleOpen}>Delete</button>
                                                        </div>
                                                    </div>
                                                    <Modal
                                                        open={dOpen}
                                                        onClose={DhandleClose}
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
                                                                    <button className='btnRed' onClick={() => deletePharmacy(uid._id)}>Delete</button>
                                                                </div>
                                                            </div><br />

                                                        </Box>
                                                    </Modal>
                                                    <Modal
                                                        open={eOpen}
                                                        onClose={EhandleClose}

                                                    >
                                                        <Box sx={style}>


                                                            <EditPharmacyDetails pharmacyId={uid._id} />

                                                        </Box>
                                                    </Modal>

                                                </>
                                            }
                                        </div>

                                    </>
                                ))
                            }
                        </div> */}

                        <div className=''>
                            {userID.map((uid, index) => (
                                <div className="parent container d-flex justify-content-center align-items-center h-100">
                                    <div className="doctorScheduleLayout" style={{ width: "95%" }}>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-sm-1">
                                                    <img className='pLogo' src='https://res.cloudinary.com/quick-health/image/upload/v1666282124/DrugPicture/istockphoto-1275720974-612x612_babp6v.jpg' alt="userlogo" style={{ width: "100px", height: "100px" }} />
                                                </div>
                                                <div class="col-sm-8 ms-4">
                                                    <div class="row">
                                                        <div class="col-sm-11 mt-3">
                                                            <div className='doctorName'>{uid.PharmacyName} pharmacy<br /></div>
                                                            <div className=''>{uid.StreetAddress}</div>
                                                            <div className=''>{uid.City}</div>
                                                            <div className=''>{uid.State}</div>
                                                            <div className=''>{uid.number}</div>
                                                            <div className=''>OpenTime:{uid.OpenTime}</div>
                                                            <div className=''>CloseTime: {uid.CloseTime}</div>

                                                        </div>
                                                        <div class="col-sm-1 mt-3">
                                                            <center>
                                                                <button className="viewDoctor ms-5 float-start" onClick={() => navigateToMyDrugs(uid._id)}>View Drugs</button>
                                                                {/* <br/>
                                                                <button className="btnOrange" onClick={EhandleOpen}>Edited</button>
                                                                <br/>
                                                                <button className="cancelBtn" onClick={DhandleOpen}>Delete</button> */}

                                                            </center>
                                                        </div>
                                                        
                                                        <div class="col-sm-6 mt-4">
                                                            <center>
                                                                <button className="cancelBtn" onClick={DhandleOpen}>Delete</button>
                                                            </center>
                                                            </div>
                                                        <div class="col-sm-6 mt-4" >
                                                            <center>
                                                                <button className="btnOrange" style={{width:"175px"}} onClick={EhandleOpen}>Edit</button>
                                                            </center>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Modal
                                        open={dOpen}
                                        onClose={DhandleClose}
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
                                                    <button className='btnRed' onClick={() => deletePharmacy(uid._id)}>Delete</button>
                                                </div>
                                            </div><br />

                                        </Box>
                                    </Modal>
                                    <Modal
                                        open={eOpen}
                                        onClose={EhandleClose}

                                    >
                                        <Box sx={style}>


                                            <EditPharmacyDetails pharmacyId={uid._id} setEOpen={setEOpen} />

                                        </Box>
                                    </Modal>
                                </div>



                            ))}
                        </div>



                    </div>
                </div>


            </div>


        </div>
    )
}

export default PharmacistHome