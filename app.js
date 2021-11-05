/*
 * nodeCA is a certificate manager server 
 */

var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');

var express = require('express')
var app = express();

var api = require('./api.js');

// Base Base path of the application
global.paths = {
    basepath: __dirname + "/",
    pkipath: __dirname + "/mypki/",
    tempdir: __dirname + "/tmp/"
};


/* * * * * * * * *
 * Server start  *
 * * * * * * * * */


console.log("NodeCA is starting up ...");

app.listen(8081, function() {
    console.log(`Listening on port 8081`);
});

// Register API paths
api.initAPI(app);



// Export app var
module.exports = {
    app: app
};