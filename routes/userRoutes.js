const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const doctor = require('../middlewares/doctor')
const pharmacist = require('../middlewares/pharmacist')


route.post("/api/auth/register", userController.register);
route.post("/api/auth/signin", userController.signing);
route.get('/api/auth/infor', auth, userController.getUser);
route.patch('/api/auth/updateProfile', auth, userController.updateProfile);
route.post('/api/auth/logout', userController.logout);
route.get('/api/admin/getAllUsers',auth,admin, userController.getAllUsers);



module.exports = route;