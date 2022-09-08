import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import './PharmacistHome.css'
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

const PharmacistHome = () => {
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
  return (
    <div>
            <div className='layout'>
            <ToastContainer />
                <div className='Phbody'>
                    {/* <h2 className='brand-title Qleft'>Profile</h2>
                    <hr /> */}
                    <div className='Phdetails'>
                        <div>
                            <img className='phLogo' src={userDetails.logo} />
                        </div>
                        <div className='phL '>
                            <h3 className='brand-title Qleft'><label className='phifo'>{userDetails.name}</label></h3>
                            <hr />
                            {/* <div className='pRow'><div><label>Email : </label><label className='pifo'>{userDetails.email}</label></div></div> */}
                          <div className='phRow'>
                              <div>
                                  <label className='phifo'>{userDetails.role}</label>
                              </div>
                          </div>
                            {/* <div className='pRow'><div><label>Gender  : </label><label className='pifo'>{userDetails.gender}</label></div></div> */}
                            {
                                isDoctor && <>
                                    {/* <h3 className='brand-title Qleft'>Professional Informations</h3> */}
                                    {/* <hr /><br /> */}
                                    <div className='phRow'><div><label>Phone  : </label><label className='phifo'>{userDetails.doctor?.phone}</label></div></div>
                                    <div className='phRow'><div><label>Service : </label><label className='phifo'>{userDetails.doctor?.service} Years</label></div></div>
                                    <div className='phRow'><div><label>Speciality  : </label><label className='phifo'>{userDetails.doctor?.speciality}</label></div></div>
                                </>
                            }
                            {
                                isPharmacist && <>
                                    {/* <h3 className='brand-title Qleft'>Professional Informations</h3> */}
                                    {/* <hr /><br /> */}
                                  <div className='phRow'><div>
                                      <IconContext.Provider
                                          value={{ color: '#4b6ede', size: '25px' }}>
                                          <BiPhone />
                                      </IconContext.Provider>
                                      <label>Phone  : </label><label className='phifo'>{userDetails.pharmacist?.phone}</label>
                                  </div>
                                  </div>
                                  <div className='phRow'>
                                      <div>
                                      <IconContext.Provider 
                                  value={{ color: '#4b6ede', size: '25px' }}>
                                     <AiOutlineMail />
                                      </IconContext.Provider>
                                          <label>Official Mail : </label><label className='phifo'>{userDetails.pharmacist?.officialMail}</label>
                                      </div>
                                  </div>
                                </>
                            }
                        </div>
                        {/* Pharmacist */}
                        <div className='phL '>
                            <h3 className='brand-title Qleft'><label className='phifo'>{userDetails.name}</label></h3>
                            <hr />
                            {/* <div className='pRow'><div><label>Email : </label><label className='pifo'>{userDetails.email}</label></div></div> */}
                          <div className='phRow'>
                              <div>
                                  <label className='phifo'>{userDetails.role}</label>
                              </div>
                          </div>
                            {/* <div className='pRow'><div><label>Gender  : </label><label className='pifo'>{userDetails.gender}</label></div></div> */}
                            {
                                isDoctor && <>
                                    {/* <h3 className='brand-title Qleft'>Professional Informations</h3> */}
                                    {/* <hr /><br /> */}
                                    <div className='phRow'><div><label>Phone  : </label><label className='phifo'>{userDetails.doctor?.phone}</label></div></div>
                                    <div className='phRow'><div><label>Service : </label><label className='phifo'>{userDetails.doctor?.service} Years</label></div></div>
                                    <div className='phRow'><div><label>Speciality  : </label><label className='phifo'>{userDetails.doctor?.speciality}</label></div></div>
                                </>
                            }
                            {
                                isPharmacist && <>
                                    {/* <h3 className='brand-title Qleft'>Professional Informations</h3> */}
                                    {/* <hr /><br /> */}
                                  <div className='phRow'><div>
                                      <IconContext.Provider
                                          value={{ color: '#4b6ede', size: '25px' }}>
                                          <BiPhone />
                                      </IconContext.Provider>
                                      <label>Phone  : </label><label className='phifo'>{userDetails.pharmacist?.phone}</label>
                                  </div>
                                  </div>
                                  <div className='phRow'>
                                      <div>
                                      <IconContext.Provider 
                                  value={{ color: '#4b6ede', size: '25px' }}>
                                     <AiOutlineMail />
                                      </IconContext.Provider>
                                          <label>Official Mail : </label><label className='phifo'>{userDetails.pharmacist?.officialMail}</label>
                                      </div>
                                  </div>
                                </>
                            }
                        </div>


                    </div>

                
                

                   
                </div>
            </div>
          <div className='layout'>
              <div className='Phbody'>
                  <h2>Profile Settings</h2>

                  <div className='phRow'>
                      <div>
                          <label className='phifo'><a href='#'>Add Pharmacist Detail</a></label>
                      </div>
                  </div>
                  <div className='phRow'>
                      <div>
                          <label className='phifo'>Update Profile</label>
                      </div>
                  </div>
                  <div className='phRow'>
                      <div>
                          <label className='phifo'>Change Password</label>
                      </div>
                  </div>
                  <div className='phRow'>
                      <div>
                          <label className='phifo'>Verify Profile</label>
                      </div>
                  </div>

              </div>
          </div>
        </div>
  )
}

export default PharmacistHome