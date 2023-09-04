const checkAlreadyInfoUserUsed = require("../../middleware/checkExistEmailOrName");
const userController = require('../../controller/userController');
const express = require("express");
const router = express.Router();

//Create User
router.post(
    "/signUp",
    checkAlreadyInfoUserUsed,
    userController.createUser
);



module.exports = router;