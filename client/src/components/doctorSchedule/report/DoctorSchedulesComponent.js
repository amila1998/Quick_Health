import React from "react";
import "../doctorSchedule.css"
import day from "../../../asserts/icons/day.png";
import time from "../../../asserts/icons/time.png";
import location from "../../../asserts/icons/location.png";
const DoctorScheduleComponent = ({ schedules }) => {

  return (
    <div id="rBody">
      {schedules.doctorSchedules.length === 0 ? (
        "Currently no Doctor Schedules created"
      ) : (
        <div>
            <div class="container">
                <center><h2 style={{ fontWeight: "bolder", fontSize: "30px" }}> Dr. {schedules.doctorDetails.name}'s Doctor Schedule</h2></center>
            </div>

            <br />

            {schedules.doctorSchedules.map(doctorSchedule => (
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
      )}
    </div>
  );
};

export default DoctorScheduleComponent;