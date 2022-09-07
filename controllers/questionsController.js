const User = require("../models/userModel");
const Ouestions = require("../models/questionModel");
const Questions = require("../models/questionModel");

const questionController = {
    createQuestion: async (req, res) => {
        try {
            const { title, body, lables } = req.body;

            if (!title)
                return res.status(400).json({ message: "Please fill in Title field." });

            const existQst = await Questions.findOne({ title });

            if (existQst)
                return res.status(400).json({ message: "This question is already have. Please Search !" });

            const newQst = new Questions({
                title, body, lables
            });


            await newQst.save();

            res.status(200).json({
                message: "Your question is successfully created !!!",
                success: true,
            });


        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 9 ~ createQuestion:async ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }

    }

};


module.exports = questionController;