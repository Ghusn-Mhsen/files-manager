const express = require("express");
const router = express.Router();
const controller = require("../../controller/history.controller");

const auth = require("../../middleware/auth");

router.get("/:page", auth, controller.getListHistoryByFileName);
module.exports = router