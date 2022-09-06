const { Schema, model } = require("mongoose");

const doctorScheduleSchema = new Schema ({
    doctorId : {
        type  : String ,
        required : true 
    },
    day : {
        type  : String ,
        required : true 
    },
    startTime : {
        type  : String ,
        required : true 
    },
    endTime : {
        type  : String ,
        required : true 
    },
    location : {
        type  : String ,
        required : true 
    },
},
{
    timestamps : true 
})

const DoctorSchedule = model('doctorSchedule' , doctorScheduleSchema)

module.exports = DoctorSchedule