const {
    File
} = require("../models/files");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async (req, res, next) => {
    try {


        let file = await File.findOne({
            where: {
                // [Op.and]: [{
                //         fileName: req.params.name
                //     }, {
                //         reserverId: {
                //             [Op.not]: null
                //         }
                //     }

                // ]
                
                    fileName: req.params.name
                

            }
        });
    
        if ((file.reserverId!=null) &&(file.reserverId!=req.user.id))
            return res.status(200).send({
                status: "false",
                message: `File ${file.fileName} Check In.`,
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