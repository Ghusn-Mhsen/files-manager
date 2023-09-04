const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");
const checkIn = require('../../middleware/check_file_blocking');
const existsFile = require('../../middleware/check_exists_file');
const auth = require("../../middleware/auth");
const owner = require('../../middleware/owner')

router.post("/:name", auth, existsFile,owner,checkIn,  controller.deleteFile);

module.exports = router