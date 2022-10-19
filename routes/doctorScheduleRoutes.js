const { Router } = require("express");
const route = Router();
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const doctor = require('../middlewares/doctor');
const doctorScheduleController = require("../controllers/doctorScheduleController");

route.post("/api/doctor/addDoctorsSchedule"  , auth , doctor ,  doctorScheduleController.addDoctorSchedule);
route.get("/api/doctor" , auth , doctor , doctorScheduleController.getADoctorSchedules);
route.delete("/api/doctor/deleteADoctorSchedule/:id" , auth , doctor , doctorScheduleController.deleteDoctorSchedule);
route.get("/api/doctors" , doctorScheduleController.getAllDoctors );
route.get("/api/doctor/:id/doctorSchedules" , doctorScheduleController.getADoctorSchedulesForPatient);
route.get("/api/doctor/:id/doctorDetails" , doctorScheduleController.getDoctorDetailsForPatient);
route.put("/api/doctor/editDoctorSchedule/:id" , auth , doctor , doctorScheduleController.editDoctorSchedule);
route.get("/api/doctor/getADoctorSchedule/:id" ,  doctorScheduleController.getADoctorSchedule);

module.exports = route;