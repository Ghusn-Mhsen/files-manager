const {
  Report
} = require('../models/reports')
module.exports = async function (req, res, fileName, userName, opName) {

  const response = await Report.create({
    fileName: fileName,
    userName: userName,
    opName: opName,
    seq_id: 1
  });

};