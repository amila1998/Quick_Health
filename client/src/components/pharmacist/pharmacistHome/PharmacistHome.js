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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
    }, [userDetails])


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


                                        <AddPharmacyDetails />

                                    </Box>
                                </Modal>
                            </div>
                            <br />


                            <div className='Phdetails'>


                                {/* Pharmacist */}


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
                                                                <label className='phifo'>{uid.CloseTime}</label>
                                                            </div>
                                                        </div>
                                                        <div className='phRow'>
                                                            <div>
                                                            <button onClick={()=>navigateToMyDrugs(uid._id)} > View Drugs </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                        </>
                                    ))
                                }
                            </div>





                        </div>
                    </div>
                

            </div>


        </div>
    )
}

export default PharmacistHome