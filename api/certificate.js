/*
 * API endpoint
 */

var util = require('util');
var fs = require('fs');
var exec = require('child_process').exec;

var certificate = {};

certificate.request = function(req, res){
    console.log("------\r\nReceived a certificate request from %s!", req.body.data.applicant);
    //console.log("the req thing",req);
    csr = req.body.data.csr;
    console.log(csr);
    console.log("------\r\n\r\n");

    console.log("basepath: ", global.paths.basepath);
    console.log("pkipath: ", global.paths.pkipath);
    console.log("tempdir: ", global.paths.tempdir);

    //var signcommand = util.format('openssl ca -batch -config %sopenssl.cnf -extensions server_cert -days 1 -notext -md sha256 -in request.csr -key "%s" -out cert.pem', global.paths.pkipath, "jjdfhhk_348dsjj4JJhsk4j7svenjemHfen");
    //var signcommand = util.format('openssl ca -batch -config %sopenssl.cnf -notext -md sha256 -in %srequest.csr -key %sprivate/ca.key.pem -out cert.pem', global.paths.pkipath,global.paths.tempdir,global.paths.pkipath);
    var signcommand = util.format('openssl x509 -req -in %srequest.csr -days 365 -CA %scerts/intermediate.cert.pem -CAkey %sprivate/ca.key.pem -set_serial 1 -out signed.crt -extfile %sopenssl-intermediate.conf -extensions v3_ca',global.paths.tempdir,global.paths.pkipath,global.paths.pkipath,global.paths.pkipath)
    // Write .csr file to tempdir
    fs.writeFile(global.paths.tempdir + 'request.csr', csr, function(err) {
        if(err) {
            console.log("Could not write temp request.csr file! Error: " + err);
        } else {
            console.log("Successfully wrote .csr file to tempdir.");

            exec(signcommand, { cwd: global.paths.tempdir }, function(error, stdout, stderr) {
                if (error === null) {
                    console.log("openssl ca command successful.");

                    // Read in generated certificate
                    fs.readFile(global.paths.tempdir + 'cert.pem', 'utf8', function(err, certdata){
                        if(err == null) {
                            //Send the generated certificate back now.
                            var response = {
                                success: true,
                                cert: certdata
                            }

                            res.end(JSON.stringify(response));
                            console.log("Response sent.");

                            // Remove files in tmp dir.
                            fs.unlinkSync(global.paths.tempdir + 'cert.pem');
                            fs.unlinkSync(global.paths.tempdir + 'request.csr');
                        } else {
                            console.log("Could not read generated cert file: " + err);
                        }
                    });
                } else {
                    console.log("openssl ca command not successful: Error: ", error)
                }
            });
        }
    });


}



module.exports = {
    certificate: certificate
}