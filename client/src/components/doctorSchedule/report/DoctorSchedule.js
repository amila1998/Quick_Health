import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../doctorSchedule.css"
import DoctorScheduleReportGenerator from "./DoctorScheduleReportGenerator";
import DoctorScheduleComponent from "./DoctorSchedulesComponent";

const DoctorSchedule = () => {
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const { dId } = useParams();
    const allDoctorSchedules = []

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

    for (const ql of doctorSchedules) {
        if (doctorSchedules.lenght != 0) {
            allDoctorSchedules.push(ql)
        }
    }

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

    const doc = {doctorDetails , doctorSchedules};
    
    return (
        <div className="doctorScheduleMainLayout">
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-3"><button className="doctorScheduleReportBtn ms-5 float-start" onClick={() => DoctorScheduleReportGenerator(doc)} >Generate The Report</button></div>
                </div>
            </div>

            <br /><br />
            <DoctorScheduleComponent schedules={(doc)}/>
            <br /><br />
        </div>

    );
}

export default DoctorSchedule;