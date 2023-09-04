const userController = require('../../controller/userController');
const express = require("express");
const router = express.Router();

router.get('/getUsers', userController.getUsers);
module.exports = router;