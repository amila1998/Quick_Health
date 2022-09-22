const { Router } = require("express");
const route = Router();
const questionsController = require("../controllers/questionsController");
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const doctor = require('../middlewares/doctor')
const pharmacist = require('../middlewares/pharmacist')



route.post("/api/questions/createQuestion",auth, questionsController.createQuestion);
route.get("/api/questions/AllQuestions", questionsController.getAllQuestions);
route.get("/api/questions/questionDetailsByID/:qID", questionsController.getQuestionById);
route.post("/api/question/report/:qID",auth, questionsController.reportQuestion);
route.post("/api/question/reply/:qID",auth, questionsController.replyToQuestion);
route.delete("/api/question/delete/:qID",auth, questionsController.deleteQuestion);



module.exports = route;