const { Router } = require("express");
const route = Router();
const questionsController = require("../controllers/questionsController");
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const doctor = require('../middlewares/doctor')
const pharmacist = require('../middlewares/pharmacist')



route.post("/api/questions/createQuestion", auth, questionsController.createQuestion);
route.get("/api/questions/AllQuestions", questionsController.getAllQuestions);
route.get("/api/questions/questionDetailsByID/:qID", questionsController.getQuestionById);
route.post("/api/question/report/:qID", auth, questionsController.reportQuestion);
route.post("/api/question/reply/:qID", auth, questionsController.replyToQuestion);
route.delete("/api/question/delete/:qID", auth, questionsController.deleteQuestion);
route.patch("/api/question/questionUpdate/:qID", auth, questionsController.updateQuestion);
route.delete("/api/question/deleteQuestionReply/:rQID/:qID", auth, questionsController.deleteQuestionReply);
route.patch("/api/question/updateReply/:rQID/:qID", auth, questionsController.editQuestionReply);
route.patch("/api/question/addChildReply/:rQID/:qID", auth, questionsController.addChildReply);
route.patch("/api/question/vote/:rQID/:qID", auth, questionsController.submitVote);
route.delete("/api/question/questionDeleteChildReply/:qID/:rQID/:rCID", auth, questionsController.questionDeleteChildReply);
route.patch("/api/question/questionEditChildReply/:qID/:rQID/:rCID", auth, questionsController.questionEditChildReply);



module.exports = route;