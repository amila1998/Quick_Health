import React, { useContext, useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import phone from "../../asserts/icons/phone.png";
import experience from "../../asserts/icons/experience.png";
import email from "../../asserts/icons/email.png";
import day from "../../asserts/icons/day.png";
import time from "../../asserts/icons/time.png";
import location from "../../asserts/icons/location.png";
import close from "../../asserts/icons/close.png";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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


function DoctorScheduleHome() {
  const state = useContext(GlobalState)
  const [token] = state.token
  const [userDetails] = state.userAPI.userDetails
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [callback, setCallback] = useState(true);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (callback) {
      const getADoctorSchedules = async () => {
        try {
          const res = await axios.get("/api/doctor", {
            headers: { Authorization: token }
          });
          setDoctorSchedules(res.data.fetch);
          setCallback(false)
        } catch (error) {
          console.log(error)
          //alert(error.response.data);
        }
      };
      getADoctorSchedules();
    }
  }, [callback, token]);


  const deleteDoctorSchedule = async (doctorScheduleId) => {
    try {
      const res = await axios.delete(`/api/doctor/deleteADoctorSchedule/${doctorScheduleId}`, {
        headers: { Authorization: token }
      });
      //alert(res.data.msg)
      handleClose();
    } catch (error) {
      //alert(error.response.data);
    }
    setCallback(true)
  }

  const editDoctorSchedule = (doctorScheduleId) => {
    navigate(`/doctor/editDoctorSchedule/${doctorScheduleId}`)
  }

  const addNewVisit = () => {
    navigate('/doctor/addDoctorsSchedule');
  }

  const handleCancel = () => {
    handleClose()
  }

  return (
    <div className="doctorScheduleMainLayout">
      <br /><br />

      <div className="container">
        <div className="row">
          <div className="col-sm-3"><center><img className='pLogo' src={userDetails.logo} style={{ width: "200px", height: "200px" }} alt="userlogo" /></center></div>
          <div className="col-sm-7">
            <div className="container" style={{ fontWeight: "400", fontSize: "18px" }}>
              <div className="row m-2">
                <div className="row" style={{ fontWeight: "500", fontSize: "25px" }}>
                  Dr. {userDetails.name}
                </div>
                <div className="row">
                  {userDetails.doctor?.speciality}
                </div>
                <br />
                <div className="row m-4">
                  <img src={phone} style={{ width: "50px", height: "34px" }} alt="phone"/><div className="col-6">{userDetails.doctor?.phone}</div>
                  <img src={experience} style={{ width: "50px", height: "36px" }} alt="experience"/><div className="col-4">{userDetails.doctor?.service} Years service</div>
                </div>
                <div className="row ms-4">
                  <img src={email} style={{ width: "50px", height: "33px" }} alt="email"/><div className="col-3">{userDetails.email}</div>
                  <div className="col-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br />
      <div class="container">
        <div class="row">
          <div class="col-sm-9"><center><h2 className="" style={{ fontWeight: "bolder", fontSize: "30px" }}>My Visiting Schedule</h2></center></div>
          <div class="col-sm-3"><button className="addVisitBtn" onClick={() => addNewVisit()} style={{ width: "180px" }} >Add New Visit</button></div>
        </div>
      </div>



      <br />


      {doctorSchedules.map(doctorSchedule => (
        <div className="parent container d-flex justify-content-center align-items-center h-100">
          <div className="doctorScheduleLayout" >
            <div class="container">
              <div class="row">
                <div class="col-sm-10 ">
                  <div class="">
                    <div class="row mt-4 ms-4" style={{ fontWeight: "400", fontSize: "20px" }}>
                      <div class="col-sm-3">
                        <img src={day} style={{ width: "25px", height: "30px", marginRight: "15px", marginBottom: "8px" }} alt="day"/>{doctorSchedule.day}
                      </div>
                      <div class="col-sm-3 ">
                        <img src={time} style={{ width: "30px", height: "30px", marginRight: "15px", marginBottom: "8px" }} alt="time"/>{doctorSchedule.startTime} - {doctorSchedule.endTime}
                      </div>
                      <div class="col-sm-5">
                        <img src={location} style={{ width: "22.17px", height: "29.17px", marginRight: "15px", marginBottom: "5px" }} alt="location"/>{doctorSchedule.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-2 ">
                  <div class="row">
                    <button className="editBtn" onClick={() => editDoctorSchedule(doctorSchedule._id)} >Edit</button>
                  </div>
                  <div class="row">
                    <button className="deleteBtn" onClick={handleOpen}>Delete</button>
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
                              <img src={close} style={{ width: "21px", height: "24px", cursor: "pointer" }} onClick={handleCancel} alt="close"/>
                              </div>
                              </div>
                              </div>
                              <hr/>
                              <div className="ms-2" style={{ fontWeight: "400", fontSize: "20px" }}>Are you want to delete this visit ?</div> <br /><br />
                              <div>
                                <div className='btncenter'>
                                  <button className='btnGreen' onClick={handleCancel}>Cancel</button>
                                  <button className='btnRed' onClick={() => deleteDoctorSchedule(doctorSchedule._id)}>Delete</button>
                                </div>
                              </div><br />

                            </Box>
                          </Modal>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
      ))}
          </div>
          );

}

          export default DoctorScheduleHome;