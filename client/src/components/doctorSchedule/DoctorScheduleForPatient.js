import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DoctorScheduleForPatient() {
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const { dId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const getADoctorSchedulesForPatient = async () => {
            try {
                const res = await axios.get(`/api/doctor/${dId}/doctorSchedules`);
                console.log(res);
                setDoctorSchedules(res.data);
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
                console.log(res);
                setDoctorDetails(res.data);
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

                    <div className="col-sm-3"><center><img className='pLogo' src={doctorDetails?.logo} style={{ width: "200px", height: "200px" }} /></center></div>
                    <div className="col-sm-6">
                        <div className="container" style={{ fontWeight: "400", fontSize: "18px" }}>
                            <div className="row m-2">
                                <div className="row" style={{ fontWeight: "500", fontSize: "25px" }}>
                                    Dr. {doctorDetails.name}
                                </div>
                                <div className="row">
                                    {doctorDetails.doctor?.speciality}
                                </div>
                                <br />
                                <div className="row m-4">
                                    <div className="col-8">{doctorDetails.doctor?.phone}</div>
                                    <div className="col-4">{doctorDetails.doctor?.service} Years service</div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-3">{doctorDetails?.email}</div>
                                    <div className="col-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br /><br />
            <div class="container">
                <center><h2 className="" style={{ fontWeight: "bolder", fontSize: "30px" }}>Doctor's Schedule</h2></center>
            </div>



            <br />


            {doctorSchedules.map(doctorSchedule => (
                <div className="parent container d-flex justify-content-center align-items-center h-100">
                    <div className="doctorScheduleLayout" >
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-9 ">
                                    <div class="">
                                        <div class="row mt-4 ms-4" style={{ fontWeight: "400", fontSize: "20px" }}>
                                            <div class="col">
                                                {doctorSchedule.day}
                                            </div>
                                            <div class="col">
                                                {doctorSchedule.startTime} - {doctorSchedule.endTime}
                                            </div>
                                            <div class="col">
                                                {doctorSchedule.location}
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