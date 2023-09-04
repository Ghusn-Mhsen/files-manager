const groupController = require('../../controller/groupController');
const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const apicache = require('apicache');
let cache = apicache.middleware
router.get('/getUserOfGroup',
    auth, cache('5 minutes'),
    groupController.getUsersOfGroup
);
module.exports = router;