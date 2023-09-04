const {
    uploadFile,
    name
} = require("../middleware/uploadFile");
const _ = require('lodash');
const dir = require("../config/path");
const fs = require('fs');
const {
    File
} = require('../models/files')
const {
    User
} = require('../models/user')
const {
    Group
} = require('../models/grp')
const Report = require('./history');

var userNameTemp = "";
const upload = async(req, res) => {
    try {

        /// Add File to assets Directory 


        await uploadFile(req, res);


        if (req.file == undefined) {
            return res.status(400).send({
                status: false,
                message: "Please upload a file!"
            });
        }




        const response = await File.create({
            fileName: name + '_' + req.file.originalname,
            ownerId: req.user.id,
            groupId: req.body.GroupId,
            reserverId: null,
        });

        Report(req, res, `${name}_${req.file.originalname}`, req.body.userName, "Upload");
        res.status(200).send({
            status: true,
            message: `Uploaded the file successfully:${req.file.originalname}`,
            data: response
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                status: false,
                message: "File size cannot be larger than 10MB!",
            });
        }
        res.status(500).send({
            status: false,
            message: `Could not upload the file: ${req.file.originalname}.${err}`,
        });
    }
};

const getListFilesByGroup = async(req, res) => {



    let files = await File.findAll({
        where: {
            groupId: req.params.id,
        },
        include: Group, // Join Table File With Table User
        // order: [
        //     ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        // ]
    });


    res.status(200).send({
        status: true,
        Data: {
            baseUrl: "http://localhost:3030/api/file/download/",
            files: files
        }
    });
};

const getListFilesByUser = async(req, res) => {

    let files = await File.findAll({
        where: {
            ownerId: req.params.id,
        },
        include: User, // Join Table File With Table User
        order: [
            ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        ]
    });

    res.status(200).send({
        status: true,
        Data: {
            baseUrl: "http://localhost:3030/api/file/download/",
            files: files
        }
    });
};

const download = (req, res) => {
    const fileName = req.params.name;

    res.download(dir.PATH + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: "Could not download the file. " + err,
            });
        }
    });
};

const deleteFile = (req, res) => {
    const fileName = req.params.name;
    fs.unlink(dir.PATH + fileName, async(err) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: `Error in Deleting File ${fileName}.`,
            });
        }
        await File.destroy({
            where: {
                fileName: req.params.name
            }
        });
        Report(req, res, req.params.name, req.body.userName, "Delete");
        res.status(200).send({
            status: true,
            message: `Delete File ${fileName} successfully. `,
        });
    });

}
const updateFileDB = async(req, res, name) => {
    try {

        /// Add File to assets Directory 


        await uploadFile(req, res);


        if (req.file == undefined) {
            return res.status(400).send({
                status: false,
                message: "Please upload a file!"
            });
        }
        const response = await File.update(

            {
                fileName: name + '_' + req.file.originalname,
                ownerId: req.user.id,
                groupId: req.body.GroupId,
                reserverId: null,
            }, {
                where: {
                    fileName: req.params.name
                },
            }

        );


        userNameTemp = req.body.userName;

        // res.status(200).send({
        //   status: true,
        //   message: `upDating the file successfully:${req.file.originalname}`,
        //   data: response
        // });
    } catch (err) {
        console.log(err);
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                status: false,
                message: "File size cannot be larger than 10MB!",
            });
        }
        res.status(500).send({
            status: false,
            message: `Could not upDate the file: ${req.file.originalname}.${err}`,
        });
    }
};
const upDateFile = (req, res) => {
    const fileName = req.params.name;

    fs.unlink(dir.PATH + fileName, async(err) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: `Error in upDating File ${fileName}.`,
            });
        }


        //upload(req, res);
        await updateFileDB(req, res, fileName);

        Report(req, res, fileName, userNameTemp, "UpDate");

        res.status(200).send({
            status: true,
            message: `upDate File ${fileName} successfully. `,
        });

    });
}



const bookFile = async(req, res) => {
    console.log(req.body.names);
    console.log(req.body.names.length);

    const sequelize = require('../startup/db');
    //let transaction;
    const transaction = await sequelize.transaction();
    try {

        let files = await File.update({
            reserverId: req.user.id
        }, {
            where: {
                fileName: {
                    [Op.in]: req.body.names
                },
            },
        }, {
            transaction: transaction
        });
        req.body.names.forEach(async element => {
            console.log("File Name IS  " + element);
            await Report(req, res, element, req.body.userName, "Check-in");

        });


        res.status(200).send({
            status: true,
            message: "Book Files Successfully..",
            Data: files
        });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
};

const cancelReservationFiles = async(req, res) => {
    console.log(req.body.names);
    console.log(req.body.names.length);

    const sequelize = require('../startup/db');

    const transaction = await sequelize.transaction();
    try {

        let files = await File.update({
            reserverId: null
        }, {
            where: {
                fileName: {
                    [Op.in]: req.body.names
                },
            },
        }, {
            transaction: transaction
        });

        req.body.names.forEach(async element => {
            console.log("File Name IS  " + element);
            await Report(req, res, element, req.body.userName, "Check-out");

        });

        res.status(200).send({
            status: true,
            message: "Cancel Reservation Files Successfully..",
            Data: files
        });
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
};


module.exports = {
    upload,
    getListFilesByGroup,
    getListFilesByUser,
    download,
    deleteFile,
    upDateFile,
    bookFile,
    cancelReservationFiles
};

/*


  /*fs.readdir(dir.PATH,  function (err, files) {
    if (err) {
      res.status(500).send({
        status: false,
        message: "Unable to scan files!",
      });
    }
    
  

    let filesInfos = [];
    files.forEach((file) => {
      filesInfos.push({
        name: file.split('_').at(-1),
        url: "http://localhost:3030/api/file/download/" + file,
      });
    });*/