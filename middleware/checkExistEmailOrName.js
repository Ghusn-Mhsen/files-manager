const { User } = require("../models/user");
const Sequlize = require("sequelize");
const Op = Sequlize.Op;
const errorControler = require('../controller/error');
const asyncMiddleWare = require('./async');
module.exports = (async(req, res, next) => {

    // check if user already exist
    // Validate if user exist in our database
    try {
        const user = await User.findOne({
            where: {
                [Op.and]: [{
                        email: req.body.email,

                    },
                    {
                        userName: req.body.userName
                    },
                ],
            },
        });



        if (user) {

            errorControler.get200(req, res, "User already registered.");
        }


        next();
    } catch (error) {
        console.log({ error })
        res.status(404).send({
            message: "ErrFromCheckUserName ",
            status: "false",
        });
    }


});