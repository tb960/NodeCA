/*
 * OCSP-Server via OpenSSL
 */

var spawn = require('child_process').spawn;
const exec            = require('child_process').exec;  
var log = require('fancy-log');

var ocsp;

/**
 * Function starts OpenSSL server
 */
var startServer = function() {
    return new Promise(function(resolve, reject) {
        log("Starting OCSP server ...")
        exec(`openssl oscp -port 7901 -test -sha256 -index index.txt -CA ca-chain.cert.pem -rkey ocsp/oscp.key.pem -rsigner oscp/oscp.cert.pem`,{
            cwd: global.paths.pkipath + 'intermediate'},
            () => log(">>>>>> OCSP server is listening on " + ':' + global.config.server.ocsp.port + " <<<<<<")
        );

        resolve();
    });
}

var stopServer = function() {
    ocsp.kill('SIGHUP');
    log("OCSP server stopped.");
};


module.exports = {
    startServer: startServer,
    stopServer: stopServer
}
