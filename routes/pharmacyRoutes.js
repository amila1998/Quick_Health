const { Router } = require("express");
const route = Router();

const pharmacyController= require("../controllers/pharmacyController");



route.post("/api/pharmacy/add", pharmacyController.addPharmacy);
route.get("/api/pharmacy/:id", pharmacyController.getOne);
route.get('/api/pharmacy/',pharmacyController.getAll);


module.exports = route;