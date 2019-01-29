var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', //opws
	password: '', // F]Ler}3>=:NfTwx=
	database: 'opwsdb'
});

connection.connect(function() {
	console.log("Connected");
});


module.exports = connection;
