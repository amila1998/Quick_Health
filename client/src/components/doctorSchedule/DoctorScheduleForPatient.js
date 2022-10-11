import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./doctorSchedule.css"
import phone from "../../asserts/icons/phone.png";
import experience from "../../asserts/icons/experience.png";
import email from "../../asserts/icons/email.png";
import day from "../../asserts/icons/day.png";
import time from "../../asserts/icons/time.png";
import location from "../../asserts/icons/location.png";

function DoctorScheduleForPatient() {
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const { dId } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const getADoctorSchedulesForPatient = async () => {
            try {
                const res = await axios.get(`/api/doctor/${dId}/doctorSchedules`);
                setDoctorSchedules(res.data.fetch);
            } catch (error) {
                console.log(error)
            }
        };
        getADoctorSchedulesForPatient();
    }, [dId]);

    useEffect(() => {
        const getDoctorDetailsForPatient = async () => {
            try {
                const res = await axios.get(`/api/doctor/${dId}/doctorDetails`);
                setDoctorDetails(res.data.fetch);
            } catch (error) {
                console.log(error)
            }
        };
        getDoctorDetailsForPatient();
    }, [dId]);


    const doctorScheduleReport = (doctorId) => {
        navigate(`/doctor/${doctorId}/doctorScheduleReport`)
    }

    return (
        <div className="doctorScheduleMainLayout">
            <br /><br />

            <div className="container">
                <div className="row">

                    <div className="col-sm-3"><center><img className='pLogo' src={doctorDetails?.logo} style={{ width: "200px", height: "200px" }} alt="userImage" /></center></div>
                    <div className="col-sm-7">
                        <div className="container" style={{ fontWeight: "400", fontSize: "18px" }}>
                            <div className="row m-2">
                                <div className="row" style={{ fontWeight: "500", fontSize: "25px" }}>
                                    Dr. {doctorDetails.name}
                                </div>
                                <div className="row">
                                    <div className=''>{doctorDetails.doctor?.speciality}</div>
                                </div>
                                <br />
                                <div className="row m-4">
                                    <img src={phone} style={{ width: "50px", height: "34px" }} alt="phone" /><div className="col-6">{doctorDetails.doctor?.phone}</div>
                                    <img src={experience} style={{ width: "50px", height: "36px" }} alt="experience" /><div className="col-4">{doctorDetails.doctor?.service} Years service</div>
                                </div>
                                <div className="row ms-4">
                                    <img src={email} style={{ width: "50px", height: "33px" }} alt="email" /><div className="col-3">{doctorDetails?.email}</div>
                                    <div className="col-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-3"><button className="doctorScheduleReportBtn ms-5 float-start" onClick={() => doctorScheduleReport(doctorDetails._id)}>Doctor Schedule Report</button></div>
                </div>
            </div>

            <br /><br />
            <div class="container">
                <center><h2 style={{ fontWeight: "bolder", fontSize: "30px" }}>Doctor's Schedule</h2></center>
            </div>



            <br />


            {doctorSchedules.map(doctorSchedule => (
                <div className="parent container d-flex justify-content-center align-items-center h-100">
                    <div className="doctorScheduleLayout" >
                        <div class="container">
                            <div class="row">
                                <div class="">
                                    <div class="">
                                        <div class="row mt-2" style={{ fontWeight: "400", fontSize: "20px" }}>
                                            <div class="col-sm">
                                                <img src={day} style={{ width: "25px", height: "30px", marginRight: "15px", marginBottom: "8px" }} alt="day" />{doctorSchedule.day}
                                            </div>
                                            <div class="col-sm ">
                                                <img src={time} style={{ width: "30px", height: "30px", marginRight: "15px", marginBottom: "8px" }} alt="time" />{doctorSchedule.startTime} - {doctorSchedule.endTime}
                                            </div>
                                            <div class="col-sm">
                                                <img src={location} style={{ width: "22.17px", height: "29.17px", marginRight: "15px", marginBottom: "5px" }} alt="location" />{doctorSchedule.location}
                                            </div>
                                        </div>
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

export default DoctorScheduleForPatient;