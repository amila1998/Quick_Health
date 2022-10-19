import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import './profile.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

const Profile = () => {
    const gState = useContext(GlobalState)
    const [isLogged] = gState.userAPI.isLogged
    const [isAdmin] = gState.userAPI.isAdmin
    const [isDoctor] = gState.userAPI.isDoctor
    const [isPharmacist] = gState.userAPI.isPharmacist
    const [userDetails] = gState.userAPI.userDetails
    const [token] = gState.token
    const navigate = useNavigate()

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
    const handleMyPharmacies=()=>{
        navigate('/pharmacist');
    }
    return (
        <div>
            <ToastContainer />
            <div className='layoutP'>
               <div className='pBodyM'>
                <div className='pBodyL'>
                <div className='Pbody'>
                    <h2 className='brand-title Qleft'>Profile</h2>
                    <hr />
                    <div className='Pdetails'>
                        <div>
                            <img className='pLogo' src={userDetails.logo} />
                        </div>
                        <div className='pL '>
                            <h3 className='brand-title Qleft'>Personal Informations</h3>
                            <hr /><br />
                            <div className='pRow'><div><label>Name  : </label><label className='pifo'>{userDetails.name}</label></div></div>
                            <div className='pRow'><div><label>Email : </label><label className='pifo'>{userDetails.email}</label></div></div>
                            <div className='pRow'><div><label>Role  : </label><label className='pifo'>{userDetails.role}</label></div></div>
                            <div className='pRow'><div><label>Gender  : </label><label className='pifo'>{userDetails.gender}</label></div></div>
                            {
                                isDoctor && <>
                                    <h3 className='brand-title Qleft'>Professional Informations</h3>
                                    <hr /><br />
                                    <div className='pRow'><div><label>Phone  : </label><label className='pifo'>{userDetails.doctor?.phone}</label></div></div>
                                    <div className='pRow'><div><label>Service : </label><label className='pifo'>{userDetails.doctor?.service} Years</label></div></div>
                                    <div className='pRow'><div><label>Speciality  : </label><label className='pifo'>{userDetails.doctor?.speciality}</label></div></div>
                                </>
                            }
                            {
                                isPharmacist && <>
                                    <h3 className='brand-title Qleft'>Professional Informations</h3>
                                    <hr /><br />
                                    <div className='pRow'><div><label>Phone  : </label><label className='pifo'>{userDetails.pharmacist?.phone}</label></div></div>
                                    <div className='pRow'><div><label>Official Mail : </label><label className='pifo'>{userDetails.pharmacist?.officialMail}</label></div></div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                </div>
                <div className='pBodyR'>
                <h3 className='brand-title Qleft'>Navigations</h3><hr/><br/>
                <div  onClick={handleUpdate} className="pNavs">Update Profile</div>
                {
                    isDoctor&&<>
                    
                    </>
                }
                  {
                    isPharmacist&&<>
                     <div  onClick={handleMyPharmacies} className="pNavs">My Pharmacies</div>
                    </>
                }

                <div onClick={handleLogout} className='pNavsSignOut'>Sign Out</div>
                </div>
                         
               </div>

            </div>
        </div>
    )
}

export default Profile