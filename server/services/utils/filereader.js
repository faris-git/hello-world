
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

exports.uploadFile = function(req, res) {
	
	var files = req.files;
	var fileName = req.body.name;
	
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
				fileDirectory = fileDirectory+'users/'+req.user.userName;
				utils.makeDirectory(fileDirectory, 1, function() {
					fs.readFile(filePath, function(err, data) {
						
						fs.writeFile(fileDirectory+'/'+fileName, function(err) {
							if(err){
								console.log("There is error while storing the file in local directory!!!");
								res.status(400).send({error: err, message: 'Error while storing the file'});
							}
							else{
								console.log("Successfully moved the file in local directory.");
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

