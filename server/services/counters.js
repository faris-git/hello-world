/**
 * This iscounter model, schema for the collection last counter
 */

var mongoose = require('mongoose');

var countersSchema = new mongoose.Schema({
	_id: String,
	seq: {type:Number}
});

var counters = mongoose.model('Counters', countersSchema);

counters.getNextSequence = function(collectionName, callback) {	
	counters.count({_id: collectionName},function(err, count){
		if (err) {			
			callback(err);
		} else {
			if (count > 0) {
				counters.findByIdAndUpdate(collectionName, {$inc:{seq:1}}, function(err, counter){					
					if(err) callback(err);
					else {						
						callback(null, counter.seq);
					}					
				});
			} else {
				new counters({_id: collectionName, seq: 1000}).save(function(err, counter) {
					if (err)
						callback(err);
					else {
						callback(null, counter.seq);
					}
				});
			}
		}
	});
};

module.exports = counters;