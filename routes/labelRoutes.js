const { Router } = require("express");
const route = Router();

const labelController= require("../controllers/labelController");


route.post("/api/label/add", labelController.addLabel);
route.get('/api/label/',labelController.getAll);
route.put('/api/label/update/:id',labelController.editLabel);
route.delete('/api/label/delete/:id',labelController.deleteLabel);


module.exports = route;