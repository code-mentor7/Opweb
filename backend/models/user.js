let bcrypt = require('bcryptjs');
let db = require('../database');

module.exports.findAll = function(user_id, callback) {
  db.query("SELECT * FROM users WHERE user_id_num != '" + user_id + "'", callback);
};

module.exports.findUser = function(user_id, callback) {
  db.query("SELECT * FROM users WHERE user_id_num = '" + user_id + "'", callback);
};

module.exports.updateUser = function(user_id, data, callback) {
  db.query("UPDATE users SET " +
           "status = '" + data.status + "'," +
           "password = '" + data.password + "'," +
           "client_id = '" + data.client_id + "' " +
           "WHERE user_id_num = '" + user_id + "'", callback)
};

module.exports.loginUser = function(email, password, callback) {
  db.query("SELECT * FROM users WHERE email = '" + email + "' and password = '" + password + "'", callback);
};

module.exports.signUp = function(data, callback) {
  db.query("INSERT INTO users SET ?", data, callback);
};

// module.exports.getCount = function(callback) {
//   db.query("select count(*) as total from users", callback);
// };

// module.exports.addUser = function(data, callback) {
// 	db.query("INSERT INTO users SET ?", data, callback);
// };

// module.exports.findByUsername = function(username, callback) {
// 	db.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
// };

// module.exports.encrypt = function(data, callback) {
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(data.password, salt, callback);
// 	})
// };

module.exports.sendResponse = function(data, res) {
	if(data.length > 0) {
		res.send({'data': data});
	} else {
		res.send({'data': null});
	}
};
