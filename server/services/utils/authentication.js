
/**
 * Authentication from the local database
 */
var LocalStartegy = (require('passport-local')).Strategy;

var passport = require('passport');

var User = require('../user');

var authenticate = function(username, password, done) {
	console.log("----------------login----------------");
	return User.findOne({
		userName:username
	}, function(err, user) {
		if (err)
			return done(err);
		if (!user) {
			return done(null, false, {message:'User not found'});
		}
		else {
			user.comparePassword(password, function(err, result) {
				if (result) {
					return done(null, user, {message: 'Welcome!!'});
				} else {
					return done(null, false, {message: 'Wrong password'});
				}
			});
		}
		return true;
	});
};

var Authentication = (function() {
	
	function Authentication() {
		passport.use(this.strategy);
		passport.serializeUser(function(user, done) {			
			done(null, user.userName);
			return true;
		});
		passport.deserializeUser(function(username, done) {			
			return User.findCleanedOne(userName, function(err, user) {
				return done(err, user);
			});
		});
	}
	
	/**
	 * Login credentials used is:
	 * userName and password
	 */
	Authentication.prototype.strategy = new LocalStartegy({
		usernameField: 'username',
		passwordField: 'password'
	}, authenticate);
	
	/**
	 * Check whether the website is logged in
	 */
	Authentication.prototype.isLambda = function(req, res, next) {
		if (!req.isAuthenticated) {
			req.flash('error', 'You need to be logged');
			res.redirect('/login');
		}
		
		return next();
	};
	
	/**
	 * Check if the user is logged in and check the role (user or admin)
	 */
	Authentication.prototype.isUser = function(req, res, next) {
		if (!req.isAuthenticated) {
			req.flash('error', 'you need to be logged');
			res.redirect('/login');
		}
		/* Enable if you want to check the role
		if (!(req.user.role == 'user' || req.user.role === 'admin')) {
			req.flash('error', 'You are not allowed');
			res.redirect('/login');
		}*/
		
		return next();
	};
	
	/**
	 * Check if authenticated
	 */
	Authentication.prototype.isAuthenticated = function(req, res, next) {
		if (!req.isAuthenticated) {
			req.flash('error', 'You need to be logged');
			res.redirect('/login');
		}
		
		return next();
	};
	
	Authentication.prototype.isAdmin = function(req, res, next) {
		if (!req.isAuthenticated) {
			req.flash('error', 'You need to be logged');
			res.redirect('/login');
		}
		
		if (req.user.role !== 'admin') {
			req.flash('error', 'You are not allowed');
			res.redirect('/login');
		}
		
		return next();
	};
	
	return Authentication;
})();

module.exports = new Authentication;