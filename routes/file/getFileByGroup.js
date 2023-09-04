const express = require("express");
const router = express.Router();
const controller = require("../../controller/file.controller");

const auth = require("../../middleware/auth");
const apicache = require('apicache');
let cache = apicache.middleware

router.get("/:id", auth, cache('5 minutes'), controller.getListFilesByGroup);
module.exports = router