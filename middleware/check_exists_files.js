const {
  File
} = require("../models/files");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async (req, res, next) => {
  try {
 
    let file = await File.findAll({
      where: {
        fileName: {
          [Op.in]: req.body.names
        }
      },
    });
    console.log(`File  exists Length IS  :  ${file.length}`);
    console.log(req.body.names.length);

    if (file.length != req.body.names.length) {

      return res.status(200).send({
        status: "false",
        message: `some Files  Not Found.`,
      });
    }


    next();

  } catch (error) {
    console.log({
      error
    })
    res.status(404).send({
      status: "false",
      message: "Error in check name of files.. ",

    });
  }
};