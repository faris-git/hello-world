
/**
 * User model/schema 
 */
var utils = require('./utils/utils').Utils;
var counters = require('./counters');
var mongoose = require('mongoose');

var userSchema =  new mongoose.Schema({
	userId: String,
	userName: {type:String},
	password: String,
	firstName: String,
	lastName: String,
	address: String,
	phone: String,
	mobile: String,
	createdDate:{type: Date, 'default': Date.now}
});

var user = mongoose.model('User', userSchema);

console.log("User-- "+JSON.stringify(user));

user.findAll = function(req, res) {
	user.find(function(err, results) {		
		if(err)
			res.send({'Error': err});
		else
			res.send(results);
	});
};

user.findByUserId = function(req,res) {
	var userId = req.params.userId;
	
	user.findOne({userId: userId}, function(err, result) {
		if(err)
			res.send({'Error': err});
		else
			res.send(result);
	});
};

user.removeByUserId = function(req, res) {
	var userId = req.params.userId;
	
	user.remove({userId: userId}, function(err){
		if(err)
			res.send({'Error': err});
		else
			res.send({'Success': 'Successfully deleted the selected user'});
	});
};

user.addUser = function(req, res) {
	var user_ = req.body;
	counters.getNextSequence('users', function(err, userId) {
		console.log("UserId:: "+userId);
		console.log(counters);
		user_.userId = userId;
		console.log(user_);
		new user(user_).save(function(err, user) {
			if(err)
				res.send({'Error': err});
			else
				res.send(user);
		});
	});
};

module.exports = user;

