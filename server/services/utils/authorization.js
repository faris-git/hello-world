
var User = require('../user');

exports.isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		console.log("--------Its authenticated");
		next();
	} else {
		console.log("Its not authenticated---------");
		res.redirect('/#login');
	}
};

exports.userExist = function(req, res, next) {
	User.count({
		userName: req.body.userName
	}, function(err, count) {
		if (count === 0) {
			next();
		} else {
			res.redirect('/');
		}
	});
};
