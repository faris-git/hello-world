
var XLSX = require('xlsx');
var fs = require('fs');
var utils = require('./utils').Utils;

var fileDirectory = __dirname.replace('services/utils', 'data/file/');

/*
 * 
var xlsx = XLSX.readFile(__dirname+'/resultset.xlsx');
var sheet_name_list = xlsx.SheetNames;
var result = {};

xlsx.SheetNames.forEach(function(y){
	for(z in xlsx.Sheets[y]) {
		if (z[0] === '!') continue;
		//console.log(y + "!" + z + "=" + JSON.stringify(xlsx.Sheets[y][z]));
		var roa = XLSX.utils.sheet_to_row_object_array(xlsx.Sheets[y]);
        if(roa.length > 0){
                result[y] = roa;
        }
        
        console.log(result);
	}
});*/

exports.getUserFiles = function(req, res) {
	var dir = fileDirectory+'users/';
	var userName = req.params.userName;
	
	console.log("Requested for user files :: "+userName);
	
	if (req.user) {
		if (userName && userName.length > 0) {
			dir += userName + '/';
			res.send({files:utils.getDirectoryFiles(dir, [], 1, 1)});	
		} else 	
			res.send({files:utils.getDirectoryFiles(dir)});		
	} else {
		res.status(401).send({message: 'Unauthorized user. Please login'});
	}
};

exports.getUserFile = function(req, res) {
	var dir = fileDirectory+'users/';
	var userName = req.params.userName;
	var fileName = req.params.fileName;
	
	if (req.user) {
		if (userName && fileName) {
			dir += userName + '/' + fileName;
			
			
			fs.readFile(dir, function(err, data) {
				if (err) {
					res.send(403, {message: 'Error, the file no more exists in the system'});
				}
				if (data) {
					res.download(dir);
				}
			});
		}
		
	} else {
		res.status(401).send({message: 'Unauthorized user. Please login'});
	}
};



exports.uploadFile = function(req, res) {
	
	var files = req.files;
	var fileName = req.body.name;
	var fileDir;
	
	if (req.user) {
		if (files) {
			
			if (files.myFile) {
				
				var filePath = files.myFile.path;
				var fileType = utils.getFileExtension(filePath);
				
				if(fileName) {
					fileName+= '.'+fileType;
				} else {
					fileName = files.myFile.name;
				}
				
				//Store the file specific to user folder inside /data/file/users
				fileDir = fileDirectory+'users/'+req.user.userName;
				utils.makeDirectory(fileDir, 1, function() {
					fs.readFile(filePath, function(err, data) {
						
						fs.writeFile(fileDir+'/'+fileName, data, function(err) {
							if(err){
								console.log("There is error while storing the file in local directory!!!");
								res.status(400).send({error: err, message: 'Error while storing the file'});
							}
							else{
								console.log("Successfully moved the file in local directory.");
								
								//Now read and store the data in database
								res.send({message:'Successfully uploaded the file'});
							}
						});
					});
				});				
			}
		}
	} else {
		res.status(401).send({message: 'Unauthorized user. Please login'});
	}
};

