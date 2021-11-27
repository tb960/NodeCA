/*
 * Creates CRL
 */


var exec   = require('child_process').exec;
var log     = require('fancy-log');
var fs      = require('fs-extra');

/*
 * Creates / updates CRL and overwrites old version.
 */
var createCRL = function() {
    exec('openssl ca -config openssl.cnf -gencrl -passin pass:INTERMEDIATE_PASSPHRASE -out crl/crl.pem', {
        cwd: global.paths.pkipath + 'intermediate'},
        () => log("CRL successfully created"));
};


module.exports = {
    createCRL: createCRL
}
