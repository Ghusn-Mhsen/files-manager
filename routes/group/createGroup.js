const express = require("express");
const router = express.Router();
const GroupController = require('../../controller/groupController');
const checkNameGroup = require('../../middleware/checkIfNameOfGrpIsalreadyUsed');
const auth = require('../../middleware/auth');
router.post(
    "/createGroup",
    auth, checkNameGroup,
    GroupController.createGroup
);



module.exports = router;