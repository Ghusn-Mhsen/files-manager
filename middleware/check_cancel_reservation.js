const {
    File
} = require("../models/files");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async (req, res, next) => {
    try {


        let file = await File.findAll({
            where: {
                [Op.and]: [{
                        fileName: {
                            [Op.in]: req.body.names
                        }
                    }, {
                        reserverId: {
                            [Op.eq]: req.user.id
                        }
                    }

                ]

            }
        });

        console.log(`File  Blocked Length IS  :  ${file.length}`);

        if (file.length != req.body.names)
            return res.status(200).send({
                status: "false",
                message: `some Files  Blocked...`,
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