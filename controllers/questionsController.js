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


            const user = await User.findById(req.user.id)

            const newQst = new Questions({
                title, body, lables, userID: user._id, userName: user.name
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

    },
    getAllQuestions: async (req, res) => {
        const query = {};
        const sort = {};

        if (req.query.keyword) {
            query.$or = [
                { "title": { $regex: req.query.keyword, $options: 'i' } }
            ];
        }
        if (req.query.createdAt) {
            //desc
            //aces
            const str = req.query.createdAt
            sort['createdAt'] = str == 'desc' ? -1 : 1
        }
        try {

            const allQuestions = await Questions.find(query).sort(sort);
            res.status(200).json({
                questions: allQuestions,
                success: true,
            });


        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 44 ~ getAllQuestions:async ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
    getQuestionById: async (req, res) => {
        try {
            const questionID = req.params.qID

            const question = await Questions.findById(questionID)
            res.status(200).json({
                question,
                success: true,
            });

        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 65 ~ getQuestionById:async ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
    reportQuestion: async (req, res) => {
        try {
            const { message } = req.body;
            const questionID = req.params.qID;
            let existReports = [];

            const question = await Questions.findById(questionID);

            if (!question)
                return res.status(400).json({ message: "Can't find this question !" });

            for (const rp of question.reports) {
                if (req.user.id == rp.userID)
                    return res.status(400).json({ message: "You are already reported !" });


            }

            for (const rp of question.reports) {
                existReports.push(rp);
            }

            const user = await User.findById(req.user.id)
            const newReport = {
                userID: req.user.id,
                userName: user.name,
                message: message,
                reportedDate: new Date(),

            }
            existReports.push(newReport);

            await Questions.findByIdAndUpdate({ _id: questionID }, { reports: existReports })

            res.status(200).json({
                msg: 'This question is successfully reported !',
                success: true,
            });

        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 83 ~ reportQuestion:async ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }


    },
    replyToQuestion: async (req, res) => {
        try {
            const { replyBodyMsg } = req.body;

            const questionID = req.params.qID;
            let existReplies = [];


            if (!replyBodyMsg)
                return res.status(400).json({ message: "Please enter reply message." });

            const question = await Questions.findById(questionID);

            if (!question)
                return res.status(400).json({ message: "Can't find this question !" });


            if (question.replies != 0) {
                for (const rr of question.replies) {
                    existReplies.push(rr)

                }
            }
            const user = await User.findById(req.user.id)
            const newReply = {
                userID: user._id,
                replyBody: replyBodyMsg,
                userName: user.name,
                createdDate: new Date(),
                updatedDate: new Date(),
                isDeleted: 0,
            }

            existReplies.push(newReply)

            await Questions.findByIdAndUpdate({ _id: questionID }, { replies: existReplies })

            res.status(200).json({
                msg: 'Reply Submitted Successfully ! ',
                success: true,
            });



        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 146 ~ replyToQuestion:async ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }

    },
    deleteQuestion: async (req, res) => {
        try {
            const questionID = req.params.qID;

            await Questions.findByIdAndDelete({ _id: questionID })

            res.status(200).json({
                msg: 'Question Deleted Successfully ! ',
                success: true,
            });

        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 199 ~ constdeleteQuestion: ~ error", error)
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
    updateQuestion: async (req, res) => {
        try {
            const questionID = req.params.qID;
            const { title, body, lables } = req.body;
            console.log("🚀 ~ file: questionsController.js ~ line 218 ~ updateQuestion: ~ title", title)

            if (!title)
                return res.status(400).json({ message: "Please fill in Title field." });

            await Questions.findByIdAndUpdate({ _id: questionID },{'title':title,'body':body,'lables':lables})
            res.status(200).json({
                msg: 'Question Update Successfull',
                success: true,
            });
        } catch (error) {
            console.log("🚀 ~ file: pharmacyController.js ~ line 55 ~ updateQuestion:async ~ error", error)
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    },
    deleteQuestionReply:async(req,res)=>{
        try {
            const replyID = req.params.rQID;
            const questionID = req.params.qID;

            const question = await Questions.findById({'_id':questionID})
               
            if (!question)
                return res.status(400).json({ message: "Can not find the question" });

            let allReplies =[]

            for(const q of question.replies){
                if (q._id!=replyID) {
                    allReplies.push(q) 
                }
            }

            await Questions.findByIdAndUpdate({ _id: questionID }, { replies: allReplies })

            res.status(200).json({
                msg: 'Reply Delete Successfull',
                success: true,
            });
        } catch (error) {
            console.log("🚀 ~ file: questionsController.js ~ line 240 ~ deleteQuestionReply:async ~ error", error)
            res.status(500).json({
                msg: error.message,
                success: false
            });
        }
    }

};


module.exports = questionController;