const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");
const checkOutFiles = require('../../middleware/check_cancel_reservation');
const existsFiles = require('../../middleware/check_exists_files');
const auth = require("../../middleware/auth");

router.post("/", auth, existsFiles,checkOutFiles,controller.cancelReservationFiles);

module.exports = router