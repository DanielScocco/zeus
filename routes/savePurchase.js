var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//create var and connect to DB
var db;
MongoClient.connect('mongodb://zeusadm:22njdk918dkfjd@ds141464.mlab.com:41464/zeus1',function(err,database){
    if(err)
        throw err;
    db = database;    
});

/* GET home page. */
router.post('/', function(req, res, next) {
  res.redirect("/login");
});

module.exports = router;