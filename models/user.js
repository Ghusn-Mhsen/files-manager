// const  _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')



// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', 
{

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	user_id:{

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
	fullName: { type: Sequelize.STRING, allowNull:false },
  userName:{ type: Sequelize.STRING, allowNull:false },

	// Column-3, email
	email: { type: Sequelize.STRING, allowNull:false },

  password: { type: Sequelize.STRING, allowNull:false },

	
      
     
      isAdmin:{type:Sequelize.BOOLEAN,allowNull:false},
    

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
}
)


 // Create token
   var generateToken=  function(userID,role) { 
 
  let payload={
  
    "id":userID,
    "isAdmin": role
  }
 
  
    const token =  jwt.sign(payload, config.get('jwtPrivateKey'));
   
    return token;
  }


//validate user
function validateUser(user,type) {
  var schema;
  switch (type){
    case 'signUp': {
      console.log('Validation SignUp')
     
      schema=  Joi.object({
        fullName    : Joi.string().min(3).max(50).required(),
        userName    : Joi.string().min(3).max(50).required(),
        email   : Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
       
      
        isAdmin :Joi.boolean().required(),
     
      })
      return schema.validate(user);
  }
  case 'login': {
    console.log('Validation Login')
      schema= Joi.object({
        email   : Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
       
      
      })
      return schema.validate(user);
  }
 
 
  default: {
     console.log('Error Validation')
  }
 
  }
  
  
}



exports.User = User; 
exports.validate = validateUser;
exports.genToken = generateToken;


