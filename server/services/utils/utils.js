
var fs = require('fs');

exports.Utils = {
		getFileExtension: function(filePath) {
			var extension = '';
			
			var is = fs.createReadStream(filePath);
			extension = is.path.split(/[. ]+/).pop();
			
			return extension;
		},
		makeDirectory: function(path, position, callback) {
			var self = this;
			var mode = 0777;
			position = position || 0;
			
			var parts = require('path').normalize(path).split('/');
			
			if (position >= parts.length) {
				if (callback) {
					return callback();
				} else {
					return true;
				}
			}
			
			var directory = parts.slice(0,Number(position + 1)).join('/');
			
			if(directory) {
				//Check whether the directory exists
				fs.stat(directory, function(err) {
			        if (err === null) {
			        	self.makeDirectory(path, position + 1, callback);			           
			        } else {
			        	//If directory doesnt exists, create the directory
			            fs.mkdir(directory, mode, function (err) {
			                if (err) {
			                	if (callback) {
			                		return callback(err);
			                	} else {
			                		throw err;
			                	}			                	
			                } else {
			                	self.makeDirectory(path, position + 1, callback);			                    
			                }
			            });
			        }
			    });
			}
		},
		getDirectoryFiles: function(dir, files_, position, length) {
			var self = this;
			var files = fs.readdirSync(dir);
			var position = position || 0;
			var length = length || files.length;
			
			files_ = files_ || new Array();
			
			for (var i in files) {
				if (!files.hasOwnProperty(i)) {					
					continue;
				}
				
				var dir_ = dir + '/' + files[i];
				
				if (fs.statSync(dir_).isDirectory()) {
					self.getDirectoryFiles(dir_, files_, ++position, length);
				} else {
					files_.push(files[i]);
				}
			}
			
			if (position >= length) {
				return files_;
			}			
		}
};