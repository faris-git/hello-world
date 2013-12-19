
/**
 * User model/schema 
 */
var utils = require('./utils/utils').Utils;

var User = utils.getSchemaModel('User', {
	userId: String,
	userName: {type:String},
	password: String,
	firstName: String,
	lastName: String,
	address: String,
	phone: String,
	mobile: String
});



