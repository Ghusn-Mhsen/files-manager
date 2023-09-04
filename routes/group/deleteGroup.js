const express = require("express");
const router = express.Router();
const GroupController = require('../../controller/groupController');
const auth = require('../../middleware/auth');
const middleWareLocator = require('../../services/middlewareLocator');
router.get(
    "/deleteGroup",
    auth, middleWareLocator.checkIfFileBlockedInGroup, GroupController.deleteGroup
);



module.exports = router;