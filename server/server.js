/**
 * This is the main nodejs server page to start the server
 */

var express = require('express'),
	path = require('path'),
	http = require('http'),
	passport = require('passport'),
	flash = require('connect-flash'),
	auth = require('./services/utils/authentication'),
	service = require('./services/common');

var useMongoose = true;

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, '../html')));
	app.use(express.session({secret: 'SECRET'}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
});

if(useMongoose) {
	var mongoose = require('mongoose');
	
	var db = mongoose.connection;
	
	db.on('error', console.error);
	db.once('open', function() {		
		require('./services/user')(app);
		
		/**
		 * The below section is for login and logout 
		 */
		app.get('/login', function(req, res) {
			res.render('login', {user: req.user, error: res.local('error') || req.flash('error')});
		});
		
		app.post('/login', 
			passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/#login',
				failureFlash: true,
				successFlash: "Welcome !"
			})
		);
		
		app.get('/logout', function(req, res) {
			req.logOut();
			res.redirect('/');
		});
	});
	
	mongoose.connect('mongodb://localhost/nodejs_template');
}

if(useMongoose) {
	//
} else {
	app.get('/users', service.findAll);
	app.get('/user/:userId', service.findByUserId);
	app.post('/user', service.addUser);
	app.put('/user/:userId', service.updateUser);
	app.delete('/user/:userId', service.deleteUser);
}

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port: "+app.get('port'));
});

/**
 * Refer this link for passport app:
 * https://github.com/ArnaudRinquin/LostAndFound
 * https://github.com/DanialK/PassportJS-Authentication
 *
 */