/**
 * The common service for testing later can be used seperate service file
 */

var DatabaseInstance = require('./database').DatabaseInstance;

var userCollection = 'user';

var db = new DatabaseInstance('localhost', 27017);

	

exports.findAll = function(req, res) {
	console.log("--------------------FInd All-------------- ");
	db.findAll(userCollection, function(err, result){		
		res.send(result);
	});
};


exports.addUser = function(req, res){
	var user = req.body;
	console.log("Adding the user:: "+JSON.stringify(user));
	
	db.save(userCollection, user, function(err, result){
		res.send(result.toString("utf8"));
	});
};

exports.updateUser = function(req, res) {
	var user = req.body;
	var userId = req.params.userId;
	delete user.userId;
	console.log("Updating the user: "+JSON.stringify(user));
	db.update(userCollection, {'userId':userId}, user, function(err, result) {
		console.log(result);
		res.send(result);
	});
};

exports.findByUserId = function(req, res) {
	console.log(req.params);
	var userId = req.params.userId;
	console.log(userId);
	
	db.search(userCollection, {'userId':userId}, function(err, result) {
		if (err)
			res.send({'error':err});
		else {
			console.log(JSON.stringify(result[0]));
			res.send(JSON.stringify(result[0]));
		}
	});
};

exports.deleteUser = function(req, res) {
	var userId = req.params.userId;
	
	db.remove(userCollection, {'userId':userId}, function(err, result) {
		console.log(JSON.stringify(result));
		res.send(JSON.stringify(result));
	});
};


//Populate sample data into the collection
var populateDB = function() {
	
	var users = [
	     {
	    	 userId:'1000',
	    	 firstName: "Faris",
	    	 lastName: "Abdulla",
	    	 userName: "faris",
	    	 address: "Neumarkt 234234, Kšln 50923, Germany",
	    	 city: "Kšln",
	    	 province: "Northrhine-Westphalen",
	    	 country: "Germany"
	     }
     ];
	
	console.log("Here it is populating the database with sample data:: "+userCollection);
	/*db.collection(userCollection, function(err, collection) {
		collection.insert(users, {safe:true}, function(err, result) {});
	});*/
}