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
                msg: "Doctor Schedule Added Success ! ",
                success: true,
            });


        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    } ,

    getADoctorSchedules : async (req, res) => {
        try {
            let doctorId = req.user.id ;
            const fetch = await DoctorSchedule.find({doctorId});

            res.status(200).json({
                msg: "Doctor Schedules Fetched Success ! ",
                fetch : fetch,
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    } ,

    deleteDoctorSchedule : async (req, res) => {
        try {
            const fetch = await DoctorSchedule.findByIdAndDelete(req.params.id);


            res.status(200).json({
                msg: "Doctor Schedule Deleted Success ! ",
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getAllDoctors : async (req , res) => {
        try {
            const fetch = await User.find({role : 'doctor'})

            res.status(200).json({
                msg: "Doctors Fetched Success ! ",
                fetch : fetch ,
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    } ,

    getADoctorSchedulesForPatient : async (req, res) => {
        try {
            let doctorId = req.params.id
            const fetch = await DoctorSchedule.find({doctorId});

            res.status(200).json({
                msg: "Doctor Schedules Fetched Success ! ",
                fetch : fetch ,
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },

    getDoctorDetailsForPatient : async (req , res) => {
        try {
            let doctorId = req.params.id
            const fetch = await User.findById(doctorId)

            res.status(200).json({
                msg: "Doctors Fetched Success ! ",
                fetch : fetch ,
                success: true,
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    } ,

    editDoctorSchedule : async ( req , res ) => {
        try {

            let doctorScheduleId = req.params.id ;
            const { doctorId , day , startTime , endTime , location } = req.body;

            const newEditDoctorSchedule = {
                day , 
                startTime , 
                endTime , 
                location
            };

            const fetch = await DoctorSchedule.findByIdAndUpdate(doctorScheduleId , newEditDoctorSchedule);

            res.status(200).json({ 
                msg: "Update success." ,
                fetch : fetch    
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    }
};

module.exports = doctorScheduleController;