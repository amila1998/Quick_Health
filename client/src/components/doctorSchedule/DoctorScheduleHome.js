import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import phone from "../../asserts/icons/phone.png";
import experience from "../../asserts/icons/experience.png";
import email from "../../asserts/icons/email.png";
import day from "../../asserts/icons/day.png";
import time from "../../asserts/icons/time.png";
import location from "../../asserts/icons/location.png";

function DoctorScheduleHome() {
  const state = useContext(GlobalState)
  const [token] = state.token
  const [userDetails] = state.userAPI.userDetails
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [callback, setCallback] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (callback) {
      const getADoctorSchedules = async () => {
        try {
          const res = await axios.get("/api/doctor", {
            headers: { Authorization: token }
          });
          console.log(res);
          setDoctorSchedules(res.data);
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
      console.log(res)
    } catch (error) {
      //alert(error.response.data);
    }
    setCallback(true)
  }

  const editDoctorSchedule = (doctorScheduleId) => {
    navigate(`/doctor/editADoctorSchedule/${doctorScheduleId}`)
  }

  const addNewVisit = () => {
    navigate('/doctor/addDoctorsSchedule');
  }

  return (
    <div className="doctorScheduleMainLayout">
      <br /><br />

      <div className="container">
        <div className="row">
          <div className="col-sm-3"><center><img className='pLogo' src={userDetails.logo} style={{ width: "200px", height: "200px" }} /></center></div>
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
                  <img src={phone} style={{ width: "50px", height: "34px" }} /><div className="col-6">{userDetails.doctor?.phone}</div>
                  <img src={experience} style={{ width: "50px", height: "36px" }} /><div className="col-4">{userDetails.doctor?.service} Years service</div>
                </div>
                <div className="row ms-4">
                  <img src={email} style={{ width: "50px", height: "33px" }} /><div className="col-3">{userDetails.email}</div>
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
                        <img src={day} style={{ width: "25px", height: "30px", marginRight: "15px", marginBottom: "8px" }} />{doctorSchedule.day}
                      </div>
                      <div class="col-sm-3 ">
                        <img src={time} style={{ width: "30px", height: "30px", marginRight: "15px", marginBottom: "8px" }} />{doctorSchedule.startTime} - {doctorSchedule.endTime}
                      </div>
                      <div class="col-sm-5">
                        <img src={location} style={{ width: "22.17px", height: "29.17px", marginRight: "15px", marginBottom: "5px" }} />{doctorSchedule.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-2 ">
                  <div class="row">
                    <button className="editBtn" >Edit</button>
                  </div>
                  <div class="row">
                    <button className="deleteBtn" onClick={() => deleteDoctorSchedule(doctorSchedule._id)}>Delete</button>
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