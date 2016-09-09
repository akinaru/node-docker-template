'use strict';

var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan')
var winston = require('winston');

var app = express();

if (!process.env.SERVER_NAME) {
	console.log("SERVER_NAME not defined");
	process.exit(1);
} else {
	console.log("SERVER_NAME : " + process.env.SERVER_NAME);
}

if (!process.env.SERVER_PORT) {
	console.log("SERVER_PORT not defined");
	process.exit(1);
} else {
	console.log("SERVER_PORT : " + process.env.SERVER_PORT);
}

if (!process.env.LOG_DIR) {
	console.log("LOG_DIR not defined");
	process.exit(1);
} else {
	console.log("LOG_DIR     : " + process.env.LOG_DIR);
}

if (!process.env.MONGODB_ENV_DOCKERCLOUD_SERVICE_HOSTNAME) {
	console.log("MONGODB_ENV_DOCKERCLOUD_SERVICE_HOSTNAME not defined");
	process.exit(1);
} else {
	console.log("MONGODB_ENV_DOCKERCLOUD_SERVICE_HOSTNAME : " + process.env.MONGODB_ENV_DOCKERCLOUD_SERVICE_HOSTNAME);
}

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: process.env.LOG_DIR + process.env.SERVER_NAME + '.log',
			handleExceptions: true,
			json: true,
			maxsize: 50000000, //50MB
			maxFiles: 1,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true
		})
	],
	exitOnError: false
});

logger.stream = {
	write: function(message, encoding) {
		logger.info(message);
	}
};

app.use(require("morgan")("combined", {
	"stream": logger.stream
}));

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://' + process.env.MONGODB_ENV_DOCKERCLOUD_SERVICE_HOSTNAME + ':27017/my_database_name';

MongoClient.connect(url, function(err, db) {
	if (err) {
		logger.info('Unable to connect to the mongoDB server from', process.env.SERVER_NAME, '. Error:', err);
	} else {
		logger.info('Connection established to', url, 'from', process.env.SERVER_NAME);

		db.close();
	}
});

app.get('/', function(req, res) {
	res.send('Hello World from ' + process.env.SERVER_NAME);
});

app.listen(process.env.SERVER_PORT, function() {
	logger.info(process.env.SERVER_NAME + ' on port ' + process.env.SERVER_PORT);
});