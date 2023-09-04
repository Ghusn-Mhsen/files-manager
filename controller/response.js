exports.get200WithSuccess = (req, res, msg) => {

    res.status(200).send({
        data: msg,

    });
};