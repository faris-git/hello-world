
/**
 * The util for adding model and schema 
 */

var mongoose = require('mongoose');

Utils = {
		getSchemaModel: function(collectionName, object, callback) {
			var schema = new mongoose.Schema(object);
			console.log(mongoose.model(collectionName, schema));
			callback(mongoose.model(collectionName, schema));
		}
};

/*Utils.prototype.getSchemaModel = function(collectionName, object) {
	var schema = new mongoose.Schema(object);
	
	return mongoose.model(collectionName, schema);
};*/

/**
 * Example as shown below
 *
var userSchema = new mongoose.Schema({
	userId: String,
	userName: {type:String, default: ''},
	password: String,
	firstName: String,
	lastName: String,
	address: String,
	phone: String,
	mobile: String
});

var User = mongoose.model('User', userSchema);
*/

module.exports.Utils = Utils;