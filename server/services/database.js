/**
 * The database configuration
 */

var mongoDb = require('mongodb');
var Db = mongoDb.Db;
var Connection = mongoDb.Connection;
var Server = mongoDb.Server;
var BSON = mongoDb.BSONPure;
var ObjectID = mongoDb.ObjectID;
var _instance;

DatabaseInstance = function(host, port, databaseName) {
	databaseName = databaseName || 'nodejs_template';
	host = host || 'localhost';
	port = port || 27017;
	
	this.db = new Db(databaseName, new Server(host, port, {auto_reconnect:true}, {}));
	_instance = this.db;
	this.db.open(function(){});
};

DatabaseInstance.prototype.getCollection = function(collectionName, callback) {
	this.db.collection(collectionName, function(error, data) {
		if(error) {
			callback(error);
		} else {
			callback(null, data);
		}
	});
};

DatabaseInstance.prototype.findAll = function(collectionName, callback) {
	this.getCollection(collectionName, function(error, collection) {
		if (error)
			callback(error);
		else {
			collection.find().toArray(function(error, results) {
				if (error)
					callback(error);
				else
					callback(null, results);
			});
		}
	});
};

DatabaseInstance.prototype.findById = function(collectionName, id, callback) {
	this.getCollection(collectionName, function(error, collection) {
		if (error)
			callback(error);
		else {
			collection.findOne({_id: data.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
				if (error)
					callback(error);
				else
					callback(null, result);
			});
		}
	});
};

DatabaseInstance.prototype.search = function(collectionName, query, callback) {
	this.getCollection(collectionName, function(error, collection) {
		if (error)
			callback(error);
		else {			
			collection.find(query).toArray(function(error, result) {				
				if (error)
					callback(error);
				else
					callback(null, result);
			});
		}
	});
};

DatabaseInstance.prototype.remove = function(collectionName, query, callback) {
	console.log("User collection: "+JSON.stringify(query));
	this.getCollection(collectionName, function(error, collection) {
		collection.remove(query, {safe:true}, function(error, result) {
			if (error)
				callback(error);
			else
				callback(null, result);
		});
	});
};

DatabaseInstance.prototype.update = function(collectionName, query, object, callback) {
	this.getCollection(collectionName, function(error, collection) {
		collection.update({'_id':new BSON.ObjectID(query._id)}, object, {safe:true}, function(error, result) {
			if (error) {
				console.log("Error! updating " + collectionName);
				callback(error);
			} else {
				console.log("The "+collectionName+" data is updated!!");
				console.log(result);
				callback(null, result);
			}
		});
	});
};

DatabaseInstance.prototype.save = function(collectionName, object, callback) {
	this.getCollection(collectionName, function(error, collection) {
		if (error)
			callback(error);
		else {
			//May be use mongoose for object based saving
			/*if (typeof(object.length) == 'undefined')
				object = [object];
			*/
			object.created_at = new Date();
			//Get the counter
			
			_instance.collection('counter', function(err, collectionCounter) {
				console.log(collectionCounter);
				if(err) object.userId = '1001';
				else {
					collectionCounter.findOne({collection: collectionName}, function(err, data) {
						console.log(data);
						if (err || !data || data == null){
							object.userId = '1001';
							collectionCounter.insert({collection: collectionName, currentId: '1001'});
						} else {
							object.userId = String((data.currentId - 0)+1);
							
							collectionCounter.update({collection:collectionName}, {collection:collectionName, currentId:object.userId}, {safe: true}, function(error, counter){
								if (error) console.log("There is error while saving the counter for :"+collectionName);
								else
									console.log("The counter for the collection: "+collectionName+" is updated");
							});
						}
						
						console.log(object);
						//Now ready to save the data
						collection.save(object, function(error, result) {
							if (error)
								callback("There is error while saving the data : "+ error);
							else 
								callback(null, result);
						});
					});					
				}					
			});
		}
	});
};

exports.DatabaseInstance = DatabaseInstance;

