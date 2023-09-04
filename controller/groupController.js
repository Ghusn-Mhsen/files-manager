const _ = require("lodash");

const asyncMiddleWare = require("../middleware/async");
const errorControler = require("./error");
const resControler = require("./response");
// const { Group, validateGroup } = require("../models/grp");
// const { File } = require('../models/files');
// const { MemberShipBetweenGroupAndUser, validate } = require('../models/userGroupMemberShip');
// const {
//     User
// } = require('../models/user')

const Sequlize = require("sequelize");
const modelsLocator = require("../services/modelsLocator");
const Op = Sequlize.Op;
exports.createGroup = asyncMiddleWare(async(req, res) => {
    const { error } = modelsLocator.Group.validateGroup(req.body);
    if (error)
        errorControler.get500(req, res, error.details[0].message);



    const GroupRes = await modelsLocator.Group.Group.create({
        grpName: req.body.grpName
    });
    if (GroupRes)
        return resControler.get200WithSuccess(req, res, GroupRes)

});
exports.deleteGroup = asyncMiddleWare(async(req, res) => {

    try {
        const sequelize = require('../startup/db')
        let transaction = await sequelize.transaction();
        await modelsLocator.Group.Group.destroy({
            where: { grp_id: req.body.grp_id },

        }, { transaction });
        await modelsLocator.File.File.destroy({
            where: {
                groupId: req.body.grp_id
            }
        }, { transaction });

        await transaction.commit();
        resControler.get200WithSuccess(req, res, "Deletion Group is Done");
    } catch (err) {

        errorControler.get500(req, res, "Deletion Group is faield ")
        if (transaction) await transaction.rollback();
    }

});
exports.addUserToGroup = asyncMiddleWare(async(req, res) => {

    //  console.log(req.body)
    const { error } = modelsLocator.MemberShipBetweenGroupAndUser.validateMemberShipBetweenGroupAndUser(req.body)
    if (error)
        return errorControler.get500(req, res, error.details[0].message);


    const addUser = await modelsLocator.MemberShipBetweenGroupAndUser.MemberShipBetweenGroupAndUser.create({
        GroupId: req.body.GroupId,
        UserId: req.body.UserId
    });

    if (!addUser)
        errorControler.get404(req, res, "Adding User To Group is Faield")

    resControler.get200WithSuccess(req, res, "Adding User To Group is Done")


});
exports.deleteUserFromGroup = asyncMiddleWare(async(req, res) => {

    try {
        const sequelize = require('../startup/db')
        let transaction;

        transaction = await sequelize.transaction();
        const deleteUser = modelsLocator.MemberShipBetweenGroupAndUser.MemberShipBetweenGroupAndUser.destroy({
            where: {
                [Op.and]: [{
                        GroupId: req.body.GroupId,

                    },
                    {
                        UserId: req.body.UserId
                    },
                ],
            },
        }, { transaction });
        const deleteFiles = modelsLocator.File.File.destroy({
            where: {
                [Op.and]: [{
                        groupId: req.body.GroupId,

                    },
                    {
                        ownerId: req.body.UserId
                    },
                ],
            },
        }, { transaction });

        transaction.commit();
        resControler.get200WithSuccess(req, res, "deleting User From Group is Done")

    } catch (err) {

        errorControler.get500(req, res, "Deletion User is faield ")
        if (transaction) await transaction.rollback();
    }
});
exports.getAllGroups = asyncMiddleWare(async(req, res) => {


    if (req.user.isAdmin) {
        const limit = parseInt(req.query['size']) // Number OF Users that Return in Every Request
        const offset = 0 + (parseInt(req.query['page']) - 1) * limit // Get last Index that Get in previous Request 
            //Check If User is found
        let group = await modelsLocator.Group.Group.findAll({
            offset: offset,
            limit: limit,
            attributes: ["grp_id", "grpName", ],
            order: [
                ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
            ]
        });





        resControler.get200WithSuccess(req, res, group)
    } else {
        const limit = parseInt(req.query['size']) // Number OF Groups that Return in Every Request
        const offset = 0 + (parseInt(req.query['page']) - 1) * limit // Get last Index that Get in previous Request 


        const result = await modelsLocator.Group.Group.findAll({
            offset: offset,
            limit: limit,


            attributes: ['grp_id', 'grpName'],
            include: [{

                model: modelsLocator.User.User,


                attributes: [],

                where: {
                    user_id: req.user.id
                },




            }],

        });




        // if (result.length == 0) {

        //     console.log("121221")
        //     let GroupCreated = await modelsLocator.Group.Group.create({
        //         grpName: "public"
        //     }, );
        //     GroupCreated = _.pick['grp_id', 'grpName']
        //     resControler.get200WithSuccess(req, res, GroupCreated)

        // }


        resControler.get200WithSuccess(req, res, result)
    }
});
//const delay = ms => new Promise(res => setTimeout(res, ms));
exports.getUsersOfGroup = asyncMiddleWare(async(req, res) => {


    // await delay(5000);
    // console.log("Waited 5s");
    const limit = parseInt(req.query['size']) // Number OF Groups that Return in Every Request
    const offset = 0 + (parseInt(req.query['page']) - 1) * limit // Get last Index that Get in previous Request 
    const groupId = parseInt(req.query['groupId']);




    const result = await modelsLocator.User.User.findAll({
        offset: offset,
        limit: limit,


        attributes: ['user_id', 'userName'],
        include: [{

            model: modelsLocator.Group.Group,


            attributes: [],

            where: {
                grp_id: groupId
            },




        }],

    });




    if (result.length == 0) {
        errorControler.get200(req, res, 'No Data')
    }

    console.log("User successfully retrieved from the API");

    resControler.get200WithSuccess(req, res, result)






});