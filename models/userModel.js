const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            default: "https://res.cloudinary.com/quick-health/image/upload/v1662370751/profile%20pics/8f1b09269d8df868039a5f9db169a772_jedu4q.jpg"
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: { type: String, required: true },
        role: {
            type: String,
            required: true,
            default: 'normalUser',
            enum: ['normalUser', 'admin', 'doctor', 'pharmacist']
        },
        pharmacist: {
            phone:String,
            officialMail:String,
        },
        doctor: {
            phone:String,
            service:String,
            speciality:String

        },

    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;