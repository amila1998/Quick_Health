const { Router } = require("express");
const route = Router();

const labelController= require("../controllers/labelController");


route.post("/api/label/add", labelController.addLabel);
route.get('/api/label/',labelController.getAll);


module.exports = route;