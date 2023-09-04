const {
    File
} = require("../models/files");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async(req, res, next) => {
    try {




        let file = await File.findAll({
            where: {
                [Op.and]: [{
                        groupId: req.body.GroupId
                    }, {
                        reserverId: {
                            [Op.eq]: req.body.UserId
                        }
                    }

                ]

            }
        });




        if (file.length != 0)
            return res.status(200).send({
                status: "false",
                message: `Some Files Inside Group  Check In.`,
            });

        next();

    } catch (error) {
        console.log({
            error
        })
        res.status(404).send({
            status: "false",
            message: "Error in check name of file.. ",

        });
    }
};