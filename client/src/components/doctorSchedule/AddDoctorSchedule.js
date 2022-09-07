import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./doctorSchedule.css"
import { useNavigate } from "react-router-dom";

const initialState = {
    startTime: "",
    endTime: ""
};

const AddDoctorSchedule = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [data, setData] = useState(initialState);
    const { startTime, endTime } = data
    const [day, setDay] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleDay = e => {
        setDay(e.target.value);
    }

    const handleLocation = e => {
        setLocation(e.target.value);
    }

    console.log(token);
    const addDoctorScheduleHandler = async (e) => {
        e.preventDefault();
        if (startTime === "" || endTime === "" || day === "" || location === "") {
            alert("Fill all the fields");
        } else {
            try {
                const res = await axios.post("/api/doctor/addDoctorsSchedule", { day, startTime, endTime, location }, {
                    headers: { Authorization: token }
                });
                console.log(res)
                alert(res.data)
                window.location.href = '/doctor'
            } catch (error) {
                alert(error.response.data);
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
                <h2 className="brand-title" style={{ fontWeight: "bolder", fontSize: "35px" }}>Add New Visiting</h2>
                <div className="input"> <br />
                    <label className="label">Day</label>
                    <br />
                    <select className="inputs" name="day" value={day} required onChange={handleDay}>
                        <option value="" >----------Select Your Day----------</option>
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
                        defaultValue={startTime}
                        onChange={onChangeHandler}
                    /><br /><br />

                    <label>End Time</label>
                    <br />
                    <input
                        type="time"
                        name="endTime"
                        pattern="HH:MM"
                        placeholder="e.g. 18:45"
                        defaultValue={endTime}
                        onChange={onChangeHandler}
                    /><br /><br />

                    <label>Location</label>
                    <br />
                    <select className="inputs" name="location" value={location} required onChange={handleLocation}>
                        <option value="">----------Select Your Location----------</option>
                        <option value="Sethma Hospitals (Pvt) Ltd">Sethma Hospitals (Pvt) Ltd</option>
                        <option value="Nawaloka Medicare - Gampaha">Nawaloka Medicare - Gampaha</option>
                        <option value="Arogya Hospitals (Pvt) Ltd">Arogya Hospitals (Pvt) Ltd</option>
                    </select><br /><br /><br />
                    <center>
                        <button className="addVisitBtn" onClick={addDoctorScheduleHandler}>Add Visit</button>
                        <button className="cancelBtn" onClick={() => cancelBtn()}>Cancel</button>
                    </center>


                </div>
            </form>

        </div>
    );


}

export default AddDoctorSchedule;