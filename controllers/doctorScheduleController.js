const DoctorSchedule = require("../models/doctorScheduleModel");
const User = require("../models/userModel");

const doctorScheduleController = {
    addDoctorSchedule : async (req, res) => {
        try {
            const { doctorId , day , startTime , endTime , location } = req.body;

            if (!day || !startTime || !endTime || !location)
            return res.status(400).json({ msg: "Please fill in all fields. " });

            const newDoctorSchedule = new DoctorSchedule({
                doctorId : req.user.id , 
                day , 
                startTime , 
                endTime , 
                location
            });

            await newDoctorSchedule.save();

            res.status(200).json({
                message: "Doctor Schedule Added Success ! ",
                success: true,
            });


        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    } ,

    getADoctorSchedules : async (req, res) => {
        try {
            let doctorId = req.user.id ;
            const fetch = await DoctorSchedule.find({doctorId});
            res.json(fetch);

            res.status(200).json({
                message: "Doctor Schedules Fetched Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    } ,

    deleteDoctorSchedule : async (req, res) => {
        try {
            const fetch = await DoctorSchedule.findByIdAndDelete(req.params.id);
            res.json( "Doctor Schedule Deleted Success ! ");

            res.status(200).json({
                message: "Doctor Schedule Deleted Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },

    getAllDoctors : async (req , res) => {
        try {
            const fetch = await User.find({role : 'doctor'})
            res.json(fetch);


            res.status(200).json({
                message: "Doctors Fetched Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    } ,

    getADoctorSchedulesForPatient : async (req, res) => {
        try {
            let doctorId = req.params.id
            const fetch = await DoctorSchedule.find({doctorId});
            res.json(fetch);

            res.status(200).json({
                message: "Doctor Schedules Fetched Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },

    getDoctorDetailsForPatient : async (req , res) => {
        try {
            let doctorId = req.params.id
            const fetch = await User.findById(doctorId)
            res.json(fetch);


            res.status(200).json({
                message: "Doctors Fetched Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    }
};

module.exports = doctorScheduleController;