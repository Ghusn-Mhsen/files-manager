const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");
const checkIn = require('../../middleware/check_file_blocking');
const existsFile = require('../../middleware/check_exists_file');
const auth = require("../../middleware/auth");

router.get("/:name", auth, checkIn, existsFile, controller.download);




module.exports = router