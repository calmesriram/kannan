var schema = require('../models/schema');
var json2csv = require('json2csv');
var path = require('path');
var mongoose =require("mongoose");
var a = path.extname

var csv = require('fast-csv');

    exports.initial=(req,res)=>{  
        res.sendFile(__dirname +'/index.html');    
        // console.log(a)
  
    }
    // /home/chainflux/ramgit/gowtham/nodeinheroku/index.html

    exports.template=(req,res)=>{  
        var fields = [
            'firstName',
            'lastName',
            'biography'
        ];

        var csv = json2csv({ data: '', fields: fields });    
        res.set("Content-Disposition", "attachment;filename=authors.csv");
        res.set("Content-Type", "application/octet-stream");    
        res.send(csv);
    }

    exports.upload=(req,res)=>{  
        if (!req.files)
		return res.status(400).send('No files were uploaded.');
	
	var authorFile = req.files.file;

	var authors = [];
		
	csv.fromString(authorFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();
		 
		 authors.push(data);
	 })
	 .on("end", function(){
        schema.create(authors, function(err, documents) {
			if (err) throw err;
			
            res.send(authors.length + ' authors have been successfully uploaded.');
            res.end()
		 });
	 });
        
    }








    // app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/template', template.get);
// app.post('/', upload.post);