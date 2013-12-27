/**
 * This is the main nodejs server page to start the server
 */

var express = require('express'),
	path = require('path'),
	http = require('http'),
	service = require('./services/common');

var useMongoose = true;

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, '../html')));
});

if(useMongoose) {
	var mongoose = require('mongoose');
	
	var db = mongoose.connection;
	
	db.on('error', console.error);
	db.once('open', function() {		
		var user = require('./services/user');
		
		app.get('/users', user.findAll);
		app.get('/user/:userId', user.findByUserId);
		app.post('/user', user.addUser);
		app.put('/user/:userId', user.updateUser);
		app.delete('/user/:userId', user.removeByUserId);
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

