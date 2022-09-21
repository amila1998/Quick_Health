import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./doctorSchedule.css"
import { useNavigate, useParams } from "react-router-dom";


const EditDoctorSchedule = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const { doctorScheduleId } = useParams();
    const [doctorSchedule, setDoctorSchedule] = useState();
    const [day, setDay] = useState();
    const [location, setLocation] = useState();
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setDoctorSchedule({ ...doctorSchedule, [e.target.name]: e.target.value });
    };

    const handleDay = e => {
        setDay(e.target.value);
    }

    const handleLocation = e => {
        setLocation(e.target.value);
    }

    useEffect(() => {
        const getADoctorSchedule = async () => {
            try {
                const res = await axios.get(`/api/doctor/getADoctorSchedule/${doctorScheduleId}`)
                setDoctorSchedule(res.data.fetch)
                console.log(res)
            } catch (error) {
                alert(error.response.data)
            }
        }
        getADoctorSchedule()
    }, [doctorScheduleId])

    console.log(doctorSchedule);

    const editDoctorScheduleHandler = async (e) => {
        e.preventDefault();
        {
            try {
                const res = await axios.put(`/api/doctor/editDoctorSchedule/${doctorScheduleId}`, { 'day': day, 'startTime': doctorSchedule.startTime, 'endTime': doctorSchedule.endTime, 'location': location }, {
                    headers: { Authorization: token }
                });
                console.log(res)
                //alert(res.data)
                window.location.href = '/doctor'
            } catch (error) {
                //alert(error.response.data);
                console.log(error);
            }
        }
    };

    const cancelBtn = () => {
        navigate('/doctor')
    }

    return (
        <div className="layout">

            <form className="addDoctorScheduleLayout" controlId="formBasicEmail" action="">
                <h2 className="brand-title" style={{ fontWeight: "bolder", fontSize: "35px" }}>Edit Doctor Visiting</h2>
                <div className="input"> <br />
                    <label className="label">Day</label>
                    <br />
                    <select className="inputs" name="day" value={day} required onChange={handleDay}>
                        <option value="" disabled>----------Select Your Day----------</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select><br /><br />
                    <label>Start Time</label>
                    <br />
                    <input
                        type="time"
                        name="startTime"
                        pattern="HH:MM"
                        placeholder="e.g. 16:45"
                        defaultValue={doctorSchedule?.startTime}
                        onChange={onChangeHandler}
                    /><br /><br />

                    <label>End Time</label>
                    <br />
                    <input
                        type="time"
                        name="endTime"
                        pattern="HH:MM"
                        placeholder="e.g. 18:45"
                        defaultValue={doctorSchedule?.endTime}
                        onChange={onChangeHandler}
                    /><br /><br />

                    <label>Location</label>
                    <br />
                    <select className="inputs" name="location" value={location} required onChange={handleLocation}>
                        <option value="" disabled>----------Select Your Location----------</option>
                        <option value="Sethma Hospitals (Pvt) Ltd">Sethma Hospitals (Pvt) Ltd</option>
                        <option value="Nawaloka Medicare - Gampaha">Nawaloka Medicare - Gampaha</option>
                        <option value="Arogya Hospitals (Pvt) Ltd">Arogya Hospitals (Pvt) Ltd</option>
                    </select><br /><br /><br />
                    <center>
                        <button className="addVisitBtn" onClick={editDoctorScheduleHandler}>Save Visit</button>
                        <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                    </center>


                </div>
            </form>

        </div>
    );


}

export default EditDoctorSchedule;