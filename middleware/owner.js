const {File} = require('../models/files');
module.exports = async function (req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden 
    let file = await File.findOne({
        where: {
          fileName: req.params.name
        },
      });


    
      console.log(`File Owner ID IS : ${file.ownerId}`);
      console.log(`User Id ID IS : ${req.user.id}`);
///TODO 
      if (file.ownerId!= req.user.id) {
  
        return res.status(403).send('Access denied.');
      } 
  
    next();
}