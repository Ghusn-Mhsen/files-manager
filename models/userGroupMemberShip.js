const Joi = require("joi");
const Sequlize = require("sequelize");
const seq = require("../startup/db");

const MemberShip = seq.define('memberShip', {

    id: {
        // Sequelize module has INTEGER Data_Type.
        type: Sequlize.INTEGER,

        // To increment user_id automatically.
        autoIncrement: true,

        // user_id can not be null.
        allowNull: false,

        // For uniquely identify user.
        primaryKey: true
    },




});

function validateAddToGroup(grp) {
    console.log('Validation add To Group')

    schema = Joi.object({

        GroupId: Joi.string().required(),
        UserId: Joi.string().required(),




    })
    return schema.validate(grp);


}


exports.MemberShipBetweenGroupAndUser = MemberShip;
exports.validateMemberShipBetweenGroupAndUser = validateAddToGroup