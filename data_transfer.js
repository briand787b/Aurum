#!/usr/bin/nodejs
// This is the file that is responsible for reading the configuration file
// I would have liked to keep this as a bash file, but I don't know how to
// parse JSON with bash.

// preliminary check to make sure that valid number of args were passed
if (process.argv.length != 4) {
	console.error("Incorrect number of arguments passed");
	console.log("unrecoverable error, exiting...");
	throw "unrecoverable error, now exiting...";
}

var config = require('./configuration.json');
var hostname = process.argv[2];
var user = process.argv[3];

try {
	switch(config["servers"][hostname]["role"]) {
		case "none":
			console.log(hostname + " has no transfer role, now exiting...");
			// probably will return the location to which th backups should be sent
			var domain = config["servers"][hostname]["domain"];
			return;
 		case "trans-network-receiver":
			console.log(hostname + " will now deposit backups to final storage...");
			console.log(config["storage"]["main"]["location"]);
			break;
	 	case "trans-network-sender":
		console.log(hostname + " will now send backups to remote storage network(s)...");
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



























process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});


