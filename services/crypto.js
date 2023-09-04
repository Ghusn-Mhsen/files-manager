const bcrypt = require("bcrypt");

exports.encodePass=async (password)=>{
    const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);
   
    return  hashPassword;
}
exports.decodePass=async (storagePassword,reqPassword)=>{
   
    return   await bcrypt.compare(storagePassword, reqPassword);
     
}