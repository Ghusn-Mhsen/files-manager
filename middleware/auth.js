const jwt = require('jsonwebtoken');
const config = require('config');



module.exports = async(req, res, next) => {


    let token = req.headers.authorization;




    if (token) {
        try {

            /* ---------------------- Check For Blacklisted Tokens ----------------------*/











            /*----------------    Decode Token      --------------*/
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));




            req.user = decoded;






            next();

        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        return res.status(400).json({
            error: 'Authorization header is missing.'
        })
    }
}