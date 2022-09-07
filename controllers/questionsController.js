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
        try {

            const allQuestions = await Questions.find();
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
    getQuestionById:async(req,res)=>{
        try {
            const questionID = req.params.qID

            const question= await Questions.findById(questionID)
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
    reportQuestion:async(req,res)=>{
      try {
        const {message}=req.body;
        const questionID = req.params.qID;
        let existReports=[];

        const question = await Questions.findById(questionID);
        console.log("🚀 ~ file: questionsController.js ~ line 86 ~ reportQuestion:async ~ question", question.reports)

        if(!question)
            return res.status(400).json({ message: "Can't find this question !" });

        for(const rp of question.reports){
            console.log("🚀 ~ file: questionsController.js ~ line 91 ~ reportQuestion:async ~ rp", rp)
            if(req.user.id==rp.userID)
                return res.status(400).json({ message: "You are already reported !" });
            
            
        }

        for(const rp of question.reports){
            existReports.push(rp);
        }

        const user = await User.findById(req.user.id)
        const newReport ={
                userID:req.user.id,
                userName:user.name,
                message:message,
                reportedDate:new Date(),

        }
        existReports.push(newReport);

        await Questions.findByIdAndUpdate({_id:questionID},{reports:existReports})

        res.status(200).json({
            msg:'This question is successfully reported !',
            success: true,
        });
        
      } catch (error) {
        console.log("🚀 ~ file: questionsController.js ~ line 83 ~ reportQuestion:async ~ error", error)
        res.status(500).json({
            message: error.message,
            success: false
        });
      }


    }

};


module.exports = questionController;