const _ = require("lodash");

const asyncMiddleWare = require("../middleware/async");
// //load Model "USER"
// const { User, validate, genToken } = require("../models/user");
const errorControler = require("./error");
const resControler = require("./response");
const Crypto = require('../services/crypto');
const modelsLocator = require("../services/modelsLocator");

//const { compareSync } = require("bcrypt");


exports.createUser = asyncMiddleWare(async(req, res) => {
    try {
        const { error } = modelsLocator.User.validate(req.body, "signUp");
        if (error)
            errorControler.get500(req, res, error.details[0].message);

        const hashedPassword = (await Crypto.encodePass(req.body.password)).toString()

        const sequelize = require('../startup/db')
        let transaction;

        transaction = await sequelize.transaction();



        const UserRes = await modelsLocator.User.User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            userName: req.body.userName,

            isAdmin: req.body.isAdmin,
        }, { transaction });
        const createPublicGroup = await modelsLocator.Group.Group.findOne({
            where: {
                grp_id: 1
            }
        }, { transaction });


        if (!createPublicGroup) {
            const GroupCreated = await modelsLocator.Group.Group.create({
                grpName: "public"
            }, transaction);

        }


        const addUser = await modelsLocator.MemberShipBetweenGroupAndUser.MemberShipBetweenGroupAndUser.create({
            GroupId: 1,
            UserId: UserRes.user_id
        }, { transaction });


        UserRes.token = modelsLocator.User.genToken(UserRes.user_id, UserRes.isAdmin);
        //Init Obj to send it AS Response
        const user = _.pick(UserRes, [
            "user_id",
            "fullName",
            "userName",
            "email",
            "isAdmin",
            "token",
        ]);


        await transaction.commit();
        resControler.get200WithSuccess(req, res, user)
    } catch (err) {

        if (transaction) await transaction.rollback();
        errorControler.get500(req, res, `faield create user :${err}`)
    }
});


exports.loginUser = asyncMiddleWare(async(req, res) => {

    const { error } = modelsLocator.User.validate(req.body, "login");
    if (error)
        errorControler.get500(req, res, error.details[0].message);

    //Check If User is found
    let user = await modelsLocator.User.User.findOne({ where: { email: req.body.email } });

    if (!user)
        errorControler.get200(req, res, 'User Is not Found')

    //Compare Between Req.password And User.password in DB
    //const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!await Crypto.decodePass(req.body.password, user.password))
        errorControler.get200(req, res, 'Invalid password.')

    //If All Things Is GenToken And Send It

    user.token = modelsLocator.User.genToken(user.user_id, user.isAdmin);
    user = _.pick(user, [
        "user_id",
        "fullName",
        "userName",
        "email",
        "isAdmin",
        "token",
    ]);

    res.status(200).send({
        status: "true",
        message: "Login Success",

        user: user,

    });
});

exports.getUsers = asyncMiddleWare(async(req, res) => {






    const limit = parseInt(req.query['size']) // Number OF Users that Return in Every Request
    const offset = 0 + (parseInt(req.query['page']) - 1) * limit // Get last Index that Get in previous Request 
        //Check If User is found
    let user = await modelsLocator.User.User.findAll({
        offset: offset,
        limit: limit,
        attributes: ["user_id", "userName", ],
        order: [
            ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        ]
    });


    if (user.length == 0) {
        errorControler.get200(req, res, 'No Data')
    }


    resControler.get200WithSuccess(req, res, user)
});