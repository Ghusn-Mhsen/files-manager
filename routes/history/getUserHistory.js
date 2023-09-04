const express = require("express");
const router = express.Router();
const controller = require("../../controller/history.controller");

const auth = require("../../middleware/auth");

router.get("/:page", auth, controller.getListHistoryByUserName);
module.exports = router