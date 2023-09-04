const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");

const auth = require("../../middleware/auth");

router.get("/:id", auth, controller.getListFilesByUser);
module.exports = router