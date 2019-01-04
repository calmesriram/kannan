var express = require("express");
var bodyparser= require("body-parser");
var cors = require("cors");
var app = express();
var mongoose =require("mongoose");
var fileUpload = require('express-fileupload');
var db = require('./config/config')
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.use(fileUpload());
require('./routes/routes')(app);
mongoose.connect(db.url,{useNewUrlParser:true},function(err,con){
    if(err)
    console.log(err)
    if(con){
        console.log("connected")
    }
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log("port is An Active:",port);