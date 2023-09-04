const winston = require('winston');
const config = require('config');
const logger = winston.createLogger({

    format: winston.format.json(),

    // error
    // warn
    // info
    // verbose
    // debug 
    // silly
    transports: [
        //    new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({
            filename: 'info.log',
            level: config.get("levelOfLog")
        }),
        //    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),

    ],
});

const addInfoLog = (obj, status) => {



    if (status < 400 && config.get('levelOfLog') == 'info') {
        logger.log({
            level: 'info',
            message: obj
        });
    } else if ((status == 401 || status == 403) && config.get('levelOfLog') == 'warn') {
        logger.log({
            level: 'warn',
            message: obj
        });
    } else if ((status > 400) && config.get('levelOfLog') == "error") {
        logger.log({
            level: 'error',
            message: obj
        })
    }

}
exports.logger = logger
exports.addInfoLog = addInfoLog