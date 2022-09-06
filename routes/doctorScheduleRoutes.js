const { Router } = require("express");
const route = Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const doctor = require('../middlewares/doctor');
const doctorScheduleController = require("../controllers/doctorScheduleController");

route.post("/doctor/addDoctorsSchedule"  , auth , doctor ,  doctorScheduleController.addDoctorSchedule);
route.get("/doctor/" , auth , doctor , doctorScheduleController.getADoctorSchedules);
// route.delete("/doctor/deleteADoctorSchedule/:id" , auth , doctor , doctorScheduleController.deleteDoctorSchedule);


module.exports = route;