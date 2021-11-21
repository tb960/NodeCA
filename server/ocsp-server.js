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

//         ocsp = spawn('openssl', [
//             'ocsp',
//             '-port', global.config.server.ocsp.port,
//             '-text',
//             '-sha256',
//             '-index', 'index.txt',
//             '-CA', 'ca-chain.cert.pem',
//             '-rkey', 'ocsp/ocsp.key.pem',
//             '-rsigner', 'ocsp/ocsp.cert.pem'
//          ], {
//             cwd: global.paths.pkipath + 'intermediate',
//             detached: true,
//             shell: true
//         });

//         //Enter ocsp private key password
//         ocsp.stdin.write(global.config.ca.intermediate.ocsp.passphrase + '\n');

//         log(">>>>>> OCSP server is listening on " + ':' + global.config.server.ocsp.port + " <<<<<<");

//         resolve();

//         ocsp.on('error', function(error) {
//             log("OCSP server startup error: " + error);
//         });

//         ocsp.on('close', function(code){
//             if(code === null) {
//                 log("OCSP server exited successfully.");
//             } else {
//                 log.error("OCSP exited with code " + code);
//             }
//         });
//     });
// };


var stopServer = function() {
    ocsp.kill('SIGHUP');
    log("OCSP server stopped.");
};


module.exports = {
    startServer: startServer,
    stopServer: stopServer
}
