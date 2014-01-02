/**
 * This is the main nodejs server page to start the server
 */

var express = require('express'),
	path = require('path'),
	http = require('http'),
	passport = require('passport'),
	flash = require('connect-flash'),
	user = require('./services/user'),
	auth = require('./services/utils/authorization'),
	service = require('./services/common'),
	fs = require('fs');

var configFile = __dirname + '/configuration.json';
var config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

console.log(config.port);
var useMongoose = config.mongoose;

//passport overridden
require('./services/utils/passport')(passport);

var app = express();

app.configure(function() {
	app.set('port', config.port || process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser('keyboard cat'));
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, '../html')));
	app.use(express.session({secret: 'keyboard cat', cookie:{maxAge:60000}}));
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
			res.render('/#login', {user: req.user, error: res.local('error') || req.flash('error')});
		});
		
		/*app.post('/login', 
			passport.authenticate('local', {
				successRedirect: '/',
				failureRedirect: '/#login',
				failureFlash: true,
				successFlash: "Welcome !"
			})
		);
		app.post('/login',
			passport.authenticate('local', {failureRedirect:'/#login', failureFlash:true}),
			function(req, res){			
				res.redirect('/');
			}
		);*/
		
		app.post('/login', function(req, res, next) {
			passport.authenticate('local', function(err, user, info) {				
				if (err) {
					return next(err);					
				}
				if (!user) {
					req.flash('error', info.message);
					//return res.send(401, info);
					return res.redirect('/#login');
				}
				
				req.logIn(user, function(err) {
					if (err) { return next(err); }
					return res.redirect('/');
				});
			})(req, res, next);
		});
		
		app.get('/profile', auth.isAuthenticated, function(req, res) {
			res.send(req.user);
		});
		
		app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
		});
	});
	
	mongoose.connect('mongodb://localhost/'+config.mongodb);
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
 * https://github.com/jaredhanson/passport-local/blob/master/examples/login/app.js
 */