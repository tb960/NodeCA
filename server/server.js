/*
 * NodeCA
 * ... a NodeJS-based OpenSSL CA management server.
 * NodeCA is published under MIT License.
 *
 * NodeCA startup file
 * Loads config, prepares CertDB database, starts OCSP server, initializes and starts HTTP server and API.
 */
const exec            = require('child_process').exec;       //use to execute shell script
const util            = require('util');                     //use to access some utilities in node
const fs              = require('fs-extra');                 //access file system in node with extra functions
const yaml            = require('js-yaml');                  //to use yaml config file in javascript
const log             = require('fancy-log');                //for fancy log purpose
const express         = require('express');                  //express for server building
const figlet          = require('figlet');                   //fancy log purpose
const commandExists   = require('command-exists').sync;      //a module to check whether a command-line exists
const http            = require('http');                     //http module
const bodyparser      = require('body-parser');              //body-parser for handling of request body

const userCheck       = require('./api.js');
const publicDl        = require('./publicDl.js');
const certdb          = require('./certdb.js');
const ocsp            = require('./ocsp-server.js');
const crl             = require('./crl.js');
const fingerprint     = require('./cert_fingerprint.js');
const genpki          = require('./genpki.js');

const app = express();

/***************
* Start server *
***************/

log.info("NodeCA is starting up ...");

console.log(figlet.textSync('NodeCA', {}));
console.log("  By Boon Khang\n\n");

// Base Base path of the application
global.paths = {
    basepath: __dirname + "/",
    datapath: __dirname + '/data/',
    pkipath: __dirname + "/data/mypki/",
    tempdir: __dirname + "/tmp/"
};


new Promise(function(resolve, reject) {
    // Checks environment
    /*
     * Make sure there is a config file config.yml
     */
    if(fs.existsSync(global.paths.datapath + 'config/config.yml')) {
        log.info("Reading config file data/config/config.yml ...");
        global.config = yaml.load(fs.readFileSync(global.paths.datapath + 'config/config.yml', 'utf8'));

        /*
         * Check if the openssl command is available
         */

        if(commandExists('openssl') === false) {
            log("openssl command is not available. Please install openssl.")
            reject()
        } else {
            /*
             * Check if there is a PKI directory with all the OpenSSL content.
             */

            fs.ensureDir(global.paths.pkipath);
            if(fs.existsSync(global.paths.pkipath + 'created') === false) {
                log("There is no PKI available. Creating PKI ...");

                genpki.create().then(function() {
                    log(">>>>>> CA has successfully been created! :-) <<<<<<")
                    resolve()
                })
                .catch(function(err) {
                    reject(err)
                })
            } else {
                resolve()
            }
        }
    } else {
        // There is no config file yet. Create one from config.yml.default and quit server.
        log("No custom config file 'data/config/config.yml' found.");
        fs.ensureDirSync(global.paths.datapath +'config');
        fs.copySync(__dirname + '/config.default.yml', global.paths.datapath + 'config/config.yml');
        log("Default config file was copied to data/config/config.yml.");
        console.log("\
        **********************************************************************\n\
        ***   Please customize data/config/config.yml according to your    ***\n\
        ***                 environment and restart script.                ***\n\
        **********************************************************************");

        log("Server will now quit.");
        reject()
    }
})
.then(function() {
    // Ensure tmp dir
    fs.ensureDir('tmp');

    // Make sure DB file exists ...
    fs.ensureFileSync('data/user.db');

    // Re-index cert database
    certdb.reindex().then(function(){
        /*
         * Start HTTP server
         */
        app.use(express.json({ limit: "30mb" }));
        app.use(express.urlencoded({ limit: "50mb", extended: "true" }));
        app.use('/api/v1', userCheck);     // JSON body parser for /api/ paths
        //other route should be specified here too

        var server = app.listen(global.config.server.http.port, function() {
            var host = server.address().address;
            var port = server.address().port;

            log.info(">>>>>> HTTP server is listening on " + ":" + port + " <<<<<<");
        });

        log.info("Registering API endpoints");
        publicDl.initPublicDl(app)
    }).catch(function(error){
        log.error("Could not initialize CertDB index: " + error);
    });

    // Start OCSP server
    ocsp.startServer()
    .then(function(){
        log.info("OCSP-Server is running");
    })
    .catch(function(error){
        log.error("Could not start OCSP server: " + error);
    });



    // Show Root Cert fingerprint
    fingerprint.getFingerprint(global.paths.pkipath + 'root/root.cert.pem').then(function(fingerprint_out) {
        log(">>>>>> Root CA Fingerprint: " + fingerprint_out);
    })
    .catch(function(err) {
        log.error("Could not get Root CA fingerprint!")
    });



    /*
     * CRL renewal cronjob
     */
    var crlrenewint = 1000 * 60 * 60 * 24; // 24h
    setInterval(crl.createCRL, crlrenewint);

    log("Server started.")
})
.catch(function(err) {
    log("Server not started.")
    if(err != undefined) {
        log("Error: " + err)
    }
    process.exit()
})





/*********************************
* Server stop routine and events *
*********************************/

var stopServer = function() {
    log("Received termination signal.");
    log("Stopping OCSP server ...");
    ocsp.stopServer();

    log("Bye!");
    process.exit();
};

process.on('SIGINT', stopServer);
process.on('SIGHUP', stopServer);
process.on('SIGQUIT', stopServer);



// const PORT = process.env.PORT || 7979;

// app.listen(PORT, ()=>{
//     console.log(`Server running on port ${PORT}`);
// });