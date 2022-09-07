const { Router } = require("express");
const route = Router();
const drugsController =require("../controllers/drugsController");


route.post("/api/drugs/add", drugsController.addDrugs);
route.get('/api/drugs/',drugsController. getAllDrugs);

module.exports = route;