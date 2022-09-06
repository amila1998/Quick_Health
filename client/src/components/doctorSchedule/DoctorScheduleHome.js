import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

function DoctorScheduleHome() {
  const state = useContext(GlobalState)
  const [token] = state.token
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [callback, setCallback] = useState(true);

  useEffect(() => {
    if (callback) {
      const getADoctorSchedules = async () => {
        try {
          const res = await axios.get("/doctor/", {
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
      const res = await axios.delete(`/doctor/deleteADoctorSchedule/${doctorScheduleId}`, {
        headers: { Authorization: token }
      });
      alert(res.data.msg)
      console.log(res)
    } catch (error) {
      alert(error.response.data);
    }
    setCallback(true)
  }

  const navigate = useNavigate()

  const editDoctorSchedule = (doctorScheduleId) => {
    navigate(`/doctor/editADoctorSchedule/${doctorScheduleId}`)
  }

  return (
    <div>


      <br />
      <br />

      <Link to="/doctor/addDoctorsSchedule">Add New Visit</Link>

      <div>
        <table>
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Product Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorSchedules.map(doctorSchedule => (
              <tr key={doctorSchedule.id}>
                <td>{doctorSchedule.day}</td>
                <td>{doctorSchedule.startTime}</td>
                <td>{doctorSchedule.endTime}</td>
                <td>{doctorSchedule.location}</td>
                <td><button onClick={() => editDoctorSchedule(doctorSchedule._id)}>Edit</button><button onClick={() => deleteDoctorSchedule(doctorSchedule._id)}>Delete</button></td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default DoctorScheduleHome;