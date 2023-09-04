const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");
const auth = require('../../middleware/auth');
const maxUp = require('../../middleware/checkMaxUpload');

router.post("/", auth, maxUp, controller.upload);


module.exports = router