 const express = require('express');
 const rateLimit = require("express-rate-limit");
 var compression = require('compression')

 const usersSignUp = require('../routes/User/signUp');
 const usersLogin = require('../routes/User/login');
 const listUsers = require('../routes/User/getUsers');
 const createGroup = require('../routes/group/createGroup');
 const addUserToGr = require('../routes/group/addUserToGroup');
 const deleteUserFromGr = require('../routes/group/deleteUserFromGroup');
 const deleteGroup = require('../routes/group/deleteGroup');
 const getGroups = require('../routes/group/getGroups');
 const getUserGroups = require('../routes/group/getUsersInGroup');
 const uploadFile = require('../routes/file/uploadFile');
 const getFile = require('../routes/file/getFile');
 const getFilesByUser = require('../routes/file/getFilesByUser');
 const getFilesByGroup = require('../routes/file/getFileByGroup');
 const getFileHistory = require('../routes/history/getFileHistory');
 const getUserHistory = require('../routes/history/getUserHistory');
 const deleteFiles = require('../routes/file/deleteFile');
 const upDateFiles = require('../routes/file/upDateFile');
 const bookFiles = require('../routes/file/bookFile');
 const CancelReservationFiles = require('../routes/file/cancelReservationFiles');
 const healthChecker = require('../routes/healthApi')

 const error = require('../middleware/error');

 module.exports = function(app) {
     app.use(express.json());



     // limitter
     app.use(
         rateLimit({
             windowMs: 1 * 1 * 60 * 1000, // 1 min duration in milliseconds
             max: 60,
             message: "You exceeded 5 requests in 1 minute limit!",
             headers: true,
         })
     );

     //compression 
     app.use(compression({
         level: 6,
         threshold: 100 * 1024,
         filter: (req, res) => {
             if (req.headers['x-no-compression']) {
                 return false;
             }
             return compression.filter(req, res);
         }
     }));



     app.use('/api/users', usersSignUp);
     app.use('/api/users', usersLogin);

     app.use('/api/file/upload', uploadFile);
     app.use('/api/file/download', getFile);
     app.use('/api/file/group/files', getFilesByGroup);
     app.use('/api/file/user/files', getFilesByUser);
     app.use('/api/file/delete', deleteFiles);
     app.use('/api/file/upDate', upDateFiles);
     app.use('/api/users', listUsers);
     app.use('/api/file/bookFile', bookFiles);
     app.use('/api/file/cancel', CancelReservationFiles);
     app.use('/api/file/history', getFileHistory);
     app.use('/api/user/history', getUserHistory);
     app.use('/api/group', createGroup);
     app.use('/api/group', deleteGroup);
     app.use('/api/group', addUserToGr);
     app.use('/api/group', deleteUserFromGr);
     app.use('/api/group', getGroups);
     app.use('/api/group', getUserGroups);


     app.use('/api/healthcheck', healthChecker);
     app.use(error);
 }