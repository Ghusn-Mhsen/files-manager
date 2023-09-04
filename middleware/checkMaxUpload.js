const config = require('config');
const modelsLocator = require('../services/modelsLocator');


module.exports = async(req, res, next) => {

    let files = await modelsLocator.File.File.count({
        where: {
            ownerId: req.user.id,
        },

    });

    if (files > parseInt(config.get('MaxUpload'))) {

        res.status(200).send({
            msg: `You can't Upload files more than ${config.get('MaxUpload')} `
        })
    }
    next();


}