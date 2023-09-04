const express = require("express");

const router = express.Router();
router.get('/',
    async(req, res, next) => {

        console.log("i am here")


        try {
            res.status(200).send({
                msg: "OK",
                uptime: process.uptime(),
                timestamp: Date.now()
            });
        } catch (error) {
            // healthcheck.message = error;
            res.status(503).send(error);
        }
    }

);
// export router with all routes included
module.exports = router;