var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');

// Initialize Express App
var app = express();

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use('/', express.static(__dirname + '/public'));

// Import API Routes
app.use(require('./api/user'));
app.use(require('./api/report'));
app.use(require('./api/order'));
app.use(require('./api/loan'));

port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("listening to port " + port);
});

