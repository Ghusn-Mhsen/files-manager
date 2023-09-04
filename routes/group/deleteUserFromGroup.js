const express = require("express");
const router = express.Router();
const GroupController = require('../../controller/groupController');
const auth = require('../../middleware/auth');
const middleWareLocator = require('../../services/middlewareLocator');
router.post(
    "/deleteUserFromGroup", auth, middleWareLocator.checkIfFileBlockedInGroupToUser, GroupController.deleteUserFromGroup
);



module.exports = router;