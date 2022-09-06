import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./doctorSchedule.css"

const AddDoctorSchedule = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [doctorSchedule, setDoctorSchedule] = useState({ day: "", startTime: "", endTime: ""  , location: "" });

    const onChangeHandler = (e) => {
        setDoctorSchedule({ ...doctorSchedule, [e.target.name]: e.target.value });
    };

    console.log(token);
    const addDoctorScheduleHandler = async (e) => {
        e.preventDefault();
        if (doctorSchedule.startTime === "" || doctorSchedule.endTime === "" ) {
          alert("Fill all the fields");
        } else {
          try {
            const res = await axios.post("/api/doctor/addDoctorsSchedule" , {...doctorSchedule , }, {
                headers: { Authorization: token }
            });
            console.log(res)
            alert(res.data)
            window.location.href='/doctor/'
          } catch (error) {
            alert(error.response.data);
            console.log(error);
          }
        }
    };

    return (
        <div className="layout">
             <form className="form" controlId="formBasicEmail" action="">
             <h2 className="brand-title">Add New Visiting</h2>
             <div className="input"> <br />
                <label>Day</label>
                <br />
                <input
                    type="name"
                    name="day"
                    defaultValue={doctorSchedule.day}
                    onChange={onChangeHandler}
                />
                <br />
                <label>Start Time</label>
                <br />
                <input
                    type="name"
                    name="startTime"
                    defaultValue={doctorSchedule.startTime}
                    onChange={onChangeHandler}
                />
                <br />
                <label>End Time</label>
                <br />
                <input
                    type="name"
                    name="endTime"
                    defaultValue={doctorSchedule.endTime}
                    onChange={onChangeHandler}
                />
                <br />
                <label>Location</label>
                <br />
                <input
                    type="name"
                    name="location"
                    defaultValue={doctorSchedule.location}
                    onChange={onChangeHandler}
                />
                <br />  <br /><br />

                <button className="addVisitBtn" onClick={addDoctorScheduleHandler}>Add Visit</button>
                <Link to="/doctor/">Cancel</Link>
             </div>
             </form>
          
        </div>
    );
    

}

export default AddDoctorSchedule ;