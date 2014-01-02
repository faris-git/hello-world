
/**
 * User model/schema 
 */

var counters = require('./counters');
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var userSchema =  new mongoose.Schema({
	userId: String,
	userName: {type:String},
	password: String,
	/*password: {type: String, required: false, 
		set:function(password){
			if (password)
				return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
			else 
				return null;
		}
	},*/
	firstName: String,
	lastName: String,
	address: String,
	phone: String,
	mobile: String,
	picture: String,
	role: String,
	createdDate:{type: Date, 'default': Date.now}
});

var user = mongoose.model('User', userSchema);

var cleaningOptions = {
		userId: 0, password: 0
};

/*module.exports = function() {
	user.findCleanedOne = function(query, callback) {
		return user.findOne(query, cleaningOptions, callback);
	};
	
	user.findCleaned = function(query, callback) {
		return user.find(query, cleaningOptions, callback);
	};
	
	user.isValidUserPassword = function(username, password, done) {
		user.findOne({
			userName:username
		}, function(err, user) {
			if (err)
				return done(err);
			if (!user) {
				return done(null, false, {message:'User not found'});
			}
			
			user.comparePassword(password, function(err, result) {
				if (result) {
					return done(null, user, {message: 'Welcome!!'});
				} else {
					return done(null, false, {message: 'Wrong password'});
				}
			});
		});
	};
	
	userSchema.methods.comparePassword = function(password, callback) {
		return callback();//bcrypt.compare(password, this.password, callback);
	};
};*/


userSchema.methods.comparePassword = function(password, callback) {
	return callback(null, password == this.password);
	//return callback();//bcrypt.compare(password, this.password, callback);
};

module.exports = function(app) {
	app.get('/users', function(req, res) {
		user.find(function(err, results) {		
			if(err)
				res.send({'Error': err});
			else
				res.send(results);
		});
	});
	
	app.get('/user/:userId', function(req, res) {
		var userId = req.params.userId;
		
		user.findOne({userId: userId}, function(err, result) {
			if(err)
				res.send({'Error': err});
			else
				res.send(result);
		});
	});
	
	app.post('/user', function(req, res) {
		var user_ = req.body;
		console.log(user_);
		counters.getNextSequence('users', function(err, userId) {			
			console.log(counters);
			user_.userId = userId;
			//console.log(user_);
			user.findOne({userName: req.body.userName}, function(err, result) {
				if(err)
					res.send({'Error': err});
				if(!result) {
					new user(user_).save(function(err, user) {
						if(err)
							res.send({'Error': err});
						else
							res.send(user);
					});
				}
				else
					res.send(500, {'message': 'The user with given username exist', 'error': err});
			});
			
			
		});
	});
	
	app.put('/user/:userId', function(req, res) {
		var user_ = req.body;
		var userId = req.params.userId;
		
		user.findOne({userId: userId}, function(err, user) {
			if(err)
				res.send({'Error': err});
			else {			
				user.set(user_);			
				user.save(function(error){
					if(error)
						res.send({'Error': err});
					else
						res.send(user);
				});
			}
		});
	});
	
	app.delete('/user/:userId', function(req, res) {
		var userId = req.params.userId;
		
		user.remove({userId: userId}, function(err){
			if(err)
				res.send({'Error': err});
			else
				res.send({'Success': 'Successfully deleted the selected user'});
		});
	});
	
	/////THis is for auth
	user.findCleanedOne = function(query, callback) {
		return user.findOne(query, cleaningOptions, callback);
	};
	
	user.findCleaned = function(query, callback) {
		return user.find(query, cleaningOptions, callback);
	};
	
	user.isValidUserPassword = function(username, password, done) {
		user.findOne({
			userName:username
		}, function(err, user) {
			if (err)
				return done(err);
			if (!user) {
				return done(null, false, {message:'User not found'});
			}
			
			if(user && user.password == password){
				return done(null, user, {message: 'Welcome!'});
			} else {
				return done(null, false, {message: 'Wrong credentials, password'});
			}
			
			/*user.comparePassword(password, function(err, result) {
				if (result) {
					return done(null, user, {message: 'Welcome!!'});
				} else {
					return done(null, false, {message: 'Wrong password'});
				}
			});*/
		});
	};
	
	userSchema.methods.comparePassword = function(password, callback) {
		return callback(null, password == this.password);
		//return callback();//bcrypt.compare(password, this.password, callback);
	};
};

/**
 * Refer this for storing image using fs
 * https://gist.github.com/aheckmann/2408370
 */
 