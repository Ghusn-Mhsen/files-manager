// const  _ = require('lodash'); //to

const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')



// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const File = sequelize.define('file', 
{

	file_id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		// To increment user_id automatically.
		autoIncrement:true,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
	},

	// Column-2, name
	fileName: { type: Sequelize.STRING, allowNull:false },
 

	// Column-3, email
	reserverId: { type: Sequelize.INTEGER, allowNull:true },
	//grpId: { type: Sequelize.INTEGER, allowNull:false },
   // ownerId: { type: Sequelize.INTEGER, allowNull:false },

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
}
)
function validateFile(file) {
    console.log('Validation AddFile')
       
        schema=  Joi.object({
            fileName    : Joi.string().min(3).max(50).required(),
            GroupId    : Joi.number().required(),
            ownerId   : Joi.number().required(),
          
         
        
         
       
        })
        return schema.validate(file);
    
    
  }
  exports.File = File; 
  exports.validateFile = validateFile;