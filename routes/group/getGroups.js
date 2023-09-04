const groupController = require('../../controller/groupController');
const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const apicache = require('apicache');
let cache = apicache.middleware
router.get('/getGroups',
    auth, cache('5 minutes'), groupController.getAllGroups
);
module.exports = router;