
/**
 * Passport to override
 */
 
 var mongoose = require('mongoose');
 var LocalStrategy = require('passport-local').Strategy;
 var User = mongoose.model('User');
 
 module.exports = function (passport) {
 
	passport.serializeUser(function(user, done) {
		console.log("Inside passport serialize:: "+user.userName);
		done(null, user.userName);
	});
	
	passport.deserializeUser(function(username, done) {
		console.log("Inside passport deserialize:: "+username);
		User.findOne({userName: username}, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use(new LocalStrategy({
		usernameField: 'userName',
		passwordField: 'password'
	}, function(username, password, done) {
		console.log("Username::"+username+" -- password::" +password);
		User.isValidUserPassword(username, password, done);
	}));
 };