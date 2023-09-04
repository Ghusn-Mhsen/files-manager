const userController = require('../../controller/userController');
const express = require("express");
const router = express.Router();
//Login
router.post('/login',
userController.loginUser
);
module.exports = router;