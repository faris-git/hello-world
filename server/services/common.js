/**
 * The common service for testing later can be used seperate service file
 */

var DatabaseInstance = require('./database').DatabaseInstance;

var userCollection = 'user';

var db = new DatabaseInstance('localhost', 27017);

	

exports.findAll = function(req, res) {
	console.log("--------------------FInd All-------------- ");
	db.findAll(userCollection, function(err, data){		
		res.send(data);
	});
};


exports.addUser = function(req, res){
	var user = req.body;
	console.log("Adding the user:: "+JSON.stringify(user));
	
	db.save(userCollection, user, function(err, collection){
		res.send(result[0].toString("utf8"));
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