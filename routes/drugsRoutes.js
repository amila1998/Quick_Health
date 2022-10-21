const { Router } = require("express");
const route = Router();
const drugsController =require("../controllers/drugsController");


route.post("/api/drugs/add", drugsController.addDrugs);
route.get('/api/oneDrug/:id',drugsController. getAllDrugs);
route.get('/api/drugs/:id',drugsController. getOne);
route.delete('/api/drugs/delete/:id',drugsController.deleteDrug);
route.put('/api/drugs/editDrug/:id',drugsController.editDrug);


module.exports = route;