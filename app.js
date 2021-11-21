/*
 * nodeCA is a certificate manager server 
 */

var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');
// var https = require('https')
// var path = require('path')


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

//provide key and cert?
// app.use('/', (req,res,next) => {
//     res.send('Hiiii wow this works')
// })

// const sslServer = https.createServer(
//     {
//         key: fs.readFileSync(path.join(paths.pkipath,'private','ca.key.pem')),    

//         cert: fs.readFileSync(path.join(paths.pkipath,'certs','ca.cert.pem'))
//     },
//     key.setAutoPadding(false),  
//     app
// )
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