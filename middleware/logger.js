const { logger, addInfoLog } = require('../services/logger');
const logRequestMeta = (req, response) => {
    const { connection, body = {}, query = {} } = req;
    const statusCode = response.statusCode
    const api = connection.remoteAddress
    let logObject = {
        api,
        body,
        query,
        response,
        statusCode
    };
    logger.log({
        level: 'error',
        logObject
    });
};
module.exports = (req, res, next) => {



    let oldSend = res.json;
    res.json = function(data) {
        //logRequestMeta(req, data)
        oldSend.apply(res, arguments)


        const obj = {
            request: req.body,
            response: (data),
            ipAddress: req.connection.remoteAddress
        }


        addInfoLog(obj, res.statusCode)
    }

    next();
}