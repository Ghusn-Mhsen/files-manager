const {
    User,
    validate,
    genToken
} = require('../models/user');

const { File, validateFile } = require('../models/files');
const { Group, validateGroup } = require('../models/grp');
const { MemberShipBetweenGroupAndUser, validateMemberShipBetweenGroupAndUser } = require('../models/userGroupMemberShip');
const { Report } = require('../models/reports');
module.exports = {
    User: { User, validate, genToken },

    File: { File, validateFile },
    Group: { Group, validateGroup },
    MemberShipBetweenGroupAndUser: { MemberShipBetweenGroupAndUser, validateMemberShipBetweenGroupAndUser },
    Report,


}