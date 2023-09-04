// const  _ = require('lodash'); //to

const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')



// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const Group = sequelize.define('group', {

    grp_id: {

        // Sequelize module has INTEGER Data_Type.
        type: Sequelize.INTEGER,

        // To increment user_id automatically.
        autoIncrement: true,

        // user_id can not be null.
        allowNull: false,

        // For uniquely identify user.
        primaryKey: true
    },

    // Column-2, name
    grpName: { type: Sequelize.STRING, allowNull: false },



    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

function validateGroup(grp) {
    console.log('Validation Grp')

    schema = Joi.object({

        grpName: Joi.string().required(),





    })
    return schema.validate(grp);


}





exports.Group = Group;
exports.validateGroup = validateGroup;