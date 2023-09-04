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
const Report = sequelize.define('report', 
{

	report_id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		// To increment user_id automatically.
		autoIncrement:true,
		initialAutoIncrement:1,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
	},


	fileName: { type: Sequelize.STRING, allowNull:false },
    userName: { type: Sequelize.STRING, allowNull:false },
    opName: { type: Sequelize.STRING, allowNull:false },
	

    //initialAutoIncrement:1,
    // seq_id:{

	
	// 	type:Sequelize.INTEGER,

	// 	autoIncrement: true,
	// 	initialAutoIncrement:1,

		
	// 	allowNull:false,

	// },
	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
}
)
function validateReport(report) {
    console.log('Validation report')
       
        schema=  Joi.object({
            fileName    : Joi.string().min(3).max(50).required(),
            opName    : Joi.string().min(3).max(50).required(),
            userName    : Joi.string().min(3).max(50).required(),
          
         

       
        })
        return schema.validate(report);
    
    
  }
  exports.Report = Report; 
  exports.validateReport = validateReport;