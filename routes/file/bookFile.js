const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");
const checkInFiles = require('../../middleware/check_files_blocking');
const existsFiles = require('../../middleware/check_exists_files');
const auth = require("../../middleware/auth");

router.post("/", auth, existsFiles,checkInFiles,controller.bookFile);

module.exports = router