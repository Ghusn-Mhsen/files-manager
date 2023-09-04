const util = require("util");
const multer = require("multer");
const maxSize = 10 * 1024 * 1024;
const dir = require("../config/path");
const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir.PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = fileName
    cb(null, uniqueSuffix + '_' + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports.uploadFile = uploadFileMiddleware;
module.exports.name = fileName;