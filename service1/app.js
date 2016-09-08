var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan')
var winston = require('winston');

var serverName = "service1"
var port = 4001;
var logDirectory = './log/';

var app = express();

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: logDirectory + serverName + '.log',
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

var url = 'mongodb://mongodb:27017/my_database_name';

MongoClient.connect(url, function(err, db) {
	if (err) {
		logger.info('Unable to connect to the mongoDB server from', serverName, '. Error:', err);
	} else {
		logger.info('Connection established to', url, 'from', serverName);

		db.close();
	}
});

app.get('/', function(req, res) {
	res.send('Hello World from ' + serverName);
});

app.listen(port, function() {
	logger.info(serverName + ' on port ' + port);
});