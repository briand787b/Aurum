#!/usr/bin/nodejs
// This is the file that is responsible for reading the configuration file
// I would have liked to keep this as a bash file, but I don't know how to
// parse JSON with bash.

// preliminary check to make sure that valid number of args were passed
if (process.argv.length != 4) {
	console.log("Incorrect number of arguments passed");
	console.log("unrecoverable error, exiting...");
	throw "unrecoverable error, now exiting...";
}

var config = require('./configuration.json');
var hostname = process.argv[2];
var user = process.argv[3];

try {
	switch(config["servers"][hostname]["role"]) {
		case "none":
			// returns the location to which the backups should be sent within the network
			var domain = config["servers"][hostname]["domain"];
			console.log(config["domains"][domain]["user"] + "@" + config["domains"][domain]["network manager"] + ".local" + ":Backups/servers/");
 			break;
		case "trans-network-receiver":
			// returns the local directory to which the backups should be deposited.
			// This is the final point of transfer for backups
			console.log(config["storage"]["main"]["location"]);
			break;
	 	case "trans-network-sender":
			// returns the user@domain to which the files should be sent over the network
			// This step requires that the hosts file has correct mapping of domains to ip addresses
			console.log(config["domains"]["home"]["user"] + "@" + config["domains"]["home"]["network manager"] + ":Backups/servers/");
	 		break;
	 	default:
 			console.log("Unexpected result from parsing of configuration.json. \n Terminating program...");
	}
}
catch (e) {
	console.log("Exception raised while parsing configuration file!");
	console.log("This is probably because hostname is absent in configuration file");
	console.log("Exiting program due to unrecoverable errors...");
	return;
}
