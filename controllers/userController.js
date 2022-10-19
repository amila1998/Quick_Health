const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../helpers/createToken");
const validateEmail = require("../helpers/validateEmail");
const User = require("../models/userModel");

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, gender, password, role } = req.body;

            // check fields
            if (!name || !email || !password || !gender || !role)
                return res.status(400).json({ message: "Please fill in all fields." });

            // check email
            if (!validateEmail(email))
                return res
                    .status(400)
                    .json({ message: "Please enter a valid email address." });

            // check user
            const user = await User.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ message: "This email is already registered in our system." });

            // check password
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ message: "Password must be at least 6 characters." });

            // hash password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            // create token
            const newUser = new User({ name, email, gender, password: hashPassword, role });

            await newUser.save();

            res.status(200).json({
                message: "User Registartion Succeessfull !!!",
                success: true,
            });


        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
    signing: async (req, res) => {
        try {
            // get cred
            const { email, password } = req.body;

            // check email
            const user = await User.findOne({ email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "This email is not registered in our system." });

            // check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "This password is incorrect." });

            // create a cookie
            const token = createToken.access({ id: user._id });

            // signing success
            res.status(200).json({ msg: "Signing success", token });
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 80 ~ signing: ~ err", err)
            res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {

        const token = createToken.access({id: 'asdjkasdasdhashdkasd' });
        res.status(200).json({ msg: "Signout success" });
    },
    updateProfile: async (req, res) => {
        try {
            // get info
            const { name, images, phone, officialMail, service, speciality } = req.body;

            var logo;

          

            const userD = await User.findById(req.user.id)
            if (images) {
                logo = images.url
            }else{
                logo = userD.logo
            }

            if (userD.role === 'doctor') {
                await User.findOneAndUpdate({ _id: req.user.id }, {
                    name,
                    logo,
                    "doctor.phone": phone,
                    "doctor.service": service,
                    "doctor.speciality": speciality,
                });

            } else if (userD.role === 'pharmacist') {
                // update
                await User.findOneAndUpdate({ _id: req.user.id }, {
                    name,
                    logo,
                    "pharmacist.phone": phone,
                    "pharmacist.officialMail": officialMail,
                });

            } else {
                // update
                await User.findOneAndUpdate({ _id: req.user.id }, { name, logo });

            }

            // success
            res.status(200).json({ msg: "Update success." });
        } catch (err) {
            console.log("🚀 ~ file: userController.js ~ line 132 ~ updateProfile: ~ err", err)
            res.status(500).json({ msg: err.message });
        }

    },
    getAllUsers :async(req,res)=>{
        try {
            const users = await User.find()
        res.status(200).json({users});
        } catch (error) {
            console.log("🚀 ~ file: userController.js ~ line 132 ~ updateProfile: ~ err", err)
            res.status(500).json({ msg: error.message });
        }
    }
};


module.exports = userController;