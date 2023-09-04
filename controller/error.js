exports.get404 = (req, res, msg) => {
    res.status(404).send({
        pageTitle: msg,
        message: "Faield"
    });
};
exports.get500 = (req, res, msg) => {
    res.status(500).send({
        pageTitle: msg,
        message: "Faield"
    });
};
exports.get200 = (req, res, msg) => {
    res.status(200).send({
        pageTitle: msg,
        message: "Faield"
    });

};