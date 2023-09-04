const Sequlize = require("sequelize");
const Op = Sequlize.Op;
const { Group } = require('../models/grp.js');
const errorController = require('../controller/error');
module.exports = async(req, res, next) => {
    try {
        // check if user already exist
        // Validate if user exist in our database
        let group = await Group.findOne({
            where: {
                grpName: req.body.grpName,

            },
        });

        if (group)
            return errorController.get500(req, res, "groupName is already used.");

        next();

    } catch (error) {
        console.log({ error })
        res.status(404).send({
            message: "ErrFromCheckGrpName ",
            status: "false",
        });
    }
};