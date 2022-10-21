const { Router } = require("express");
const route = Router();

const pharmacyController= require("../controllers/pharmacyController");



route.post("/api/pharmacy/add", pharmacyController.addPharmacy);
route.get("/api/pharmacy/:id", pharmacyController.getOne);
route.get('/api/onePharmacy/:id',pharmacyController.getAll);
route.get('/api/pharmacy/',pharmacyController.getAllPharmacy);
// route.get('/api/onePharmacy/:id',pharmacyController.getOnePharmacy);
route.put("/api/pharmacy/editPharmacy/:id", pharmacyController.editPharmacy);
route.delete("/api/pharmacy/deletePharmacy/:id", pharmacyController.deletePharmacy);


module.exports = route;