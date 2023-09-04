const express = require("express");
const router = express.Router();
const GroupController = require('../../controller/groupController');
const auth = require('../../middleware/auth');

router.post(
    "/addUserToGroup",
    auth,
    GroupController.addUserToGroup
);



module.exports = router;