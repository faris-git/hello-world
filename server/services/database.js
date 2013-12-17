/**
 * The database configuration
 */

var mongoDb = require('mongodb');
var Db = mongoDb.Db;
var Connection = mongoDb.Connection;
var Server = mongoDb.Server;
var BSON = mongoDb.BSON;
var ObjectID = mongoDb.ObjectID;

DatabaseInstance = function(host, port, databaseName) {
	databaseName = databaseName || 'nodejs_template';
	
	this.db = new Db(databaseName, new Server(host, port, {auto_reconnect:true}, {}));
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
	this.getCollection(collectionName, function(error, data) {
		if (error)
			callback(error);
		else {
			data.find().toArray(function(error, results) {
				if (error)
					callback(error);
				else
					callback(null, results);
			});
		}
	});
};

DatabaseInstance.prototype.findById = function(collectionName, id, callback) {
	this.getCollection(collectionName, function(error, data) {
		if (error)
			callback(error);
		else {
			data.findOne({_id: data.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
				if (error)
					callback(error);
				else
					callback(null, result);
			});
		}
	});
};

DatabaseInstance.prototype.save = function(collectionName, object, callback) {
	this.getCollection(collectionName, function(error, collection) {
		if (error)
			callback(error);
		else {
			//May be use mongoose for object based saving
			if (typeof(object.length) == 'undefined')
				object = [object];
			
			for (var i=0; i < object.length; i++) {
				
			}
		}
	});
};

exports.DatabaseInstance = DatabaseInstance;

