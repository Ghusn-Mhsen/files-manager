const { Group } = require("./grp.js");
const { User } = require("./user.js");
const { MemberShipBetweenGroupAndUser } = require("./userGroupMemberShip");
const { File } = require("./files");

module.exports = function() {

    /* Many To Many */
    Group.belongsToMany(User, { through: MemberShipBetweenGroupAndUser, foreignKey: "GroupId", });
    User.belongsToMany(Group, { through: MemberShipBetweenGroupAndUser, foreignKey: "UserId", });



    /* one To Many*/
    User.hasMany(File, {
        foreignKey: "ownerId",
    });
    File.belongsTo(User, { foreignKey: "ownerId" })
    Group.hasMany(File, {
        foreignKey: "groupId",
    });
    File.belongsTo(Group, { foreignKey: "groupId" })

};