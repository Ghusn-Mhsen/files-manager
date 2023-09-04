const {
  Report
} = require('../models/reports')
const getListHistoryByFileName = async (req, res) => {
  let limit = 10 // Number OF Post that Return in Every Request 
  let offset = 0 + (req.params.page - 1) * limit // Get last Index that Get in previous Request  

  let history = await Report.findAll({
    where: {
      fileName: req.body.fileName,
    },
    offset: offset,
    limit: limit,
    //include: User, // Join Table File With Table User
    order: [
      ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
    ]
  });


  res.status(200).send({
    status: true,
    Data: history
  });
};


const getListHistoryByUserName = async (req, res) => {
  let limit = 10 // Number OF Post that Return in Every Request 
  let offset = 0 + (req.params.page - 1) * limit // Get last Index that Get in previous Request  

  let history = await Report.findAll({
    where: {
      userName: req.body.userName,
    },
    offset: offset,
    limit: limit,
    //include: User, // Join Table File With Table User
    order: [
      ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
    ]
  });


  res.status(200).send({
    status: true,
    Data: history
  });
};

module.exports = {
  getListHistoryByFileName,
  getListHistoryByUserName
}