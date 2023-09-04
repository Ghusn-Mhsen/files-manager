const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const checkIfUserNameANdEmailIsAlreadyUsed = require('../middleware/checkExistEmailOrName');
const checkIfNameOfGroupIsAlreadyUsed = require('../middleware/checkIfNameOfGrpIsalreadyUsed');
const error = require('../middleware/error');
const logger = require('../middleware/logger');
const initMulter = require('../middleware/uploadFile');
const checkIfFileBlockedInGroup = require('../middleware/checkFileBlockingInGroup');
const checkIfFileBlockedInGroupToUser = require('../middleware/checkBlockedFilesToUser');
module.exports = {
    admin,
    auth,
    checkIfNameOfGroupIsAlreadyUsed,
    checkIfUserNameANdEmailIsAlreadyUsed,
    error,
    logger,
    initMulter,
    checkIfFileBlockedInGroup,
    checkIfFileBlockedInGroupToUser
}

//exports.middlwareLocator = middlwareLocator