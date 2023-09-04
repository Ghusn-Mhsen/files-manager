const {
  File
} = require("../models/files");

module.exports = async (req, res, next) => {
  try {

    let file = await File.findOne({
      where: {
        fileName: req.params.name
      },
    });

    if (file== null) {

      return res.status(200).send({
        status: "false",
        message: `File  ${req.params.name} Not Found.`,
      });
    }


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