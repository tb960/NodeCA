/*
 * This file is user to create and delete user using command line into the database
 * example of creating user is node nodepkictl useradd --username user1 --password user1password
 * example of removing user is node nodepkictl userdel --username user1
 * you can view the hashed data under data/user.db
 * currently the user registered is name:user1, password: user1password
 */

var log     = require('fancy-log');
var yargs   = require('yargs');

var auth    = require('./middleware/auth.js');


/**
 * Register subcommands
 */
var argv = yargs
    .usage("Usage: $0 <subcommand> [options]")
    .command("useradd", "Create a new API user", function(yargs){
        var argv = yargs
            .option('username', {
                demand: true,
                describe: "Username for new user",
                type: "string"
            })
            .option('password', {
                demand: true,
                describe: "Password for new user",
                type: "string"
            })
            .example("$0 useradd --username thomas --password thomaspassword")
            .argv;

            if(auth.addUser(argv.username, argv.password)) {
                log("User created successfully.");
            } else {
                log("Error: Username already exists!");
            }
    })
    .command("userdel", "Delete existing API user", function(yargs){
        var argv = yargs
            .option('username', {
                demand: true,
                describe: "Username for new user",
                type: "string"
            })
            .example("$0 userdel --username thomas")
            .argv;

            if(auth.delUser(argv.username)) {
                log("User deleted successfully.");
            } else {
                log("Error: Username does not exist!");
            }
    })
    .demandCommand(1)
    .help("h")
    .alias("h", "help")
    .argv